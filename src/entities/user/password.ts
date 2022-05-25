import { InvalidPasswordError } from "./errors/invalidPassword";
import { Result } from "../../utils/result";

export class Password {
  public static create(password: string) {
    if (Password.isValid(password)) {
      return Result<Password>.success(new Password());
    }

    return Result<InvalidPasswordError>.failure(new InvalidPasswordError('Password is invalid'));
  }

  public static isValid(password: string) {
    if (!password || password.trim().length < 6) {
      return false;
    }

    return true;
  }
}