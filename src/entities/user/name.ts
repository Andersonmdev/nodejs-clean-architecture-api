import { InvalidNameError } from "./errors/invalidName";
import { Result } from "../../utils/result";

export class Name {
  public static create(name: string) {
    if (Name.isValid(name)) {
      return Result<Name>.success(new Name());
    }

    return Result<InvalidNameError>.failure(new InvalidNameError('Name is invalid'));
  }

  public static isValid(name: string) {
    if (!name || name.trim().length < 2 || name.trim().length > 50) {
      return false;
    }

    return true;
  }
}