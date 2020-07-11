import { User, UserRole } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  protected table: string = "user_spotenu";

  private UserFromUserModel(UserModel?: any): User | undefined {
    return (
      UserModel &&
      new User(
        UserModel.id,
        UserModel.name,
        UserModel.email,
        UserModel.nickname,
        UserModel.password,
        UserModel.role,
        UserModel.band_description
      )
    );
  }

  public async createUser(user: User): Promise<void> {
    await super.getConnection().raw(
      `
            INSERT INTO ${
              this.table
            } (id, name, email, nickname, password, role)
            VALUES (
                '${user.getId()}',
                '${user.getName()}',
                '${user.getEmail()}',
                '${user.getNickname()}',
                '${user.getPassword()}',
                '${user.getRole()}'
            )`
    );
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection().raw(
      `
            SELECT * from ${this.getUserByEmail} WHERE email ='${email}'
            
     `
    );
    return this.UserFromUserModel(result[0][0]);
  }
}
