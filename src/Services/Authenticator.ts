import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  private static expiresIn = 7200;

  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: Authenticator.expiresIn,
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
  role: string;
}
