import { InvalidNameError } from "./errors/invalidName";
import { Result } from "../../utils/result";

export class Name {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  get value() {
    return this.name;
  }

  public static create(name: string) {
    if (Name.isValid(name)) {
      return Result<Name>.success(new Name(name));
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