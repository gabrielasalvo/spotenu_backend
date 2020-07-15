import { User, UserRole } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";
import { InvalidParameterError } from "../error/invalidParameterError";

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
        UserModel.band_description,
        UserModel.is_approved
      )
    );
  }

  public async createUser(user: User): Promise<void> {
    await super.getConnection().raw(
      `
            INSERT INTO ${
              this.table
            } (id, name, email, nickname, password, role, description_band )
            VALUES (
                '${user.getId()}',
                '${user.getName()}',
                '${user.getEmail()}',
                '${user.getNickname()}',
                '${user.getPassword()}',
                '${user.getRole()}',
                '${user.getDescription()}'

            )`
    );
  }

  public async getUserByNickname(nickname: string): Promise<User | undefined> {
    const result = await this.getConnection().raw(
      `
            SELECT * from ${this.table} WHERE nickname ='${nickname}'
            
     `
    );
    return this.UserFromUserModel(result[0][0]);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection().raw(
      `
            SELECT * from ${this.table} WHERE email ='${email}'
            
     `
    );
    return this.UserFromUserModel(result[0][0]);
  }

  public async approve(id: string) {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${this.table}
    WHERE id = "${id}"
    `);

    const data = result[0][0];
    console.log(data);

    if (data.is_approved === 1) {
      throw new Error("Usuário já aprovado!");
    }

    await this.getConnection().raw(`
    UPDATE ${this.table}
    SET is_approved = 1
    WHERE id = "${id}"
    `);
  }

  public async disapproved(id: string, role: string): Promise<any> {
    try {
      const result = await super.getConnection().raw(
        `
     SELECT * FROM ${this.table} WHERE id = '${id}'
     
     `
      );
      const userRole = this.UserFromUserModel(result[0][0]);

      if (userRole.getRole() !== "admin") {
        await super.getConnection().raw(`
     UPDATE ${this.table}
     SET is_approved = 0
     WHERE role = '${role}'
     
     `);
      }
    } catch (err) {
      throw new InvalidParameterError("Tivemos um erro. Tente novamente.");
    }
  }
}
