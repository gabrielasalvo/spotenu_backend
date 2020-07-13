import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { NotFoundError } from "../error/notFoundError";

import { InvalidParameterError } from "../error/invalidParameterError";
import { User, UserRole } from "../model/User";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public async signup(
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    description_band?:string
    
  ) {
    if (!name || !email || !password || !role) {
      throw new InvalidParameterError("MISSING INPUT");
    }

    if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
      throw new InvalidParameterError("INVALID EMAIL");
    }

    if (password.length < 6) {
      throw new InvalidParameterError(
        "YOUR PASSWORD NEED 6 OR MORE CHARACTERS"
      );
    }
    if (role === UserRole.ADMIN && password.length < 10) {
      throw new InvalidParameterError(
        "YOUR PASSWORD NEED 10 OR MORE CHARACTERS"
      );
    }
    if(role === UserRole.BANDA && password.length <= 10) {
      throw new InvalidParameterError ( "Invalid password")
    }

    const id = this.idGenerator.generate();

    const hashpassword = await this.hashManager.hash(password);

    const user = new User(
      id,
      name,
      nickname,
      email,
      hashpassword,
      User.userRoleType(role),
      description_band
    );


    const newUser = await this.userDatabase.createUser(user);
    if (role !== "admin") {
      await this.userDatabase.disapproved(id,role);
    }

    const token = this.authenticator.generate({ id, role });
    return { token };
  }
  public async approve(id: string) {
    await this.userDatabase.approve(id);
  }

  public async login(password: string, email?: string, nickname?: string) {
    if (!email && !nickname) {
      throw new InvalidParameterError("Missing input");
    }
    if ((email && password) || (nickname && password)) {
      const login = await this.userDatabase.getUserByEmail(email);
      if (!login) {
        throw new NotFoundError("Invalid user");
      }
      const isPasswordCorrect = await this.hashManager.compareHash(password, login.getPassword())
      if(!isPasswordCorrect) {
        throw new InvalidParameterError("Somethings wrong")
        
      }
    }
  }
}
