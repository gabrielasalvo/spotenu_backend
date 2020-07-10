import { InvalidParameterError } from "../error/invalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname:string,
    private email: string,
    private password: string,
    private role: UserRole,
    private description_band?:string,
  ) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getNickname():string {
    return this.nickname
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
  public getRole(): UserRole {
    return this.role;
  }
  public getDescription():any {
      return this.description_band
  }

  static userRoleType(role: string): UserRole {
    switch (role) {
      case "banda":
        return UserRole.BANDA;
      case "pagante":
        return UserRole.OUVINTE_PAGANTE;
        break;
      case "nao_pagante":
        return UserRole.OUVINTE_NAO_PAGANTE;
        break;
      case "admin":
        return UserRole.ADMIN;
        break;
      default:
        throw new InvalidParameterError("Invalid user role");
    }
  }
}

export enum UserRole {
  BANDA = "banda",
  OUVINTE_PAGANTE = "pagante",
  OUVINTE_NAO_PAGANTE = "nao_pagante",
  ADMIN = "admin",
}
