import { InvalidNameError } from "./errors/invalidName";
import { Result } from "../../utils/result";

export class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  get value() {
    return this.email;
  }

  static create(email: string) {
    if (Email.isValid(email)) {
      return Result<Email>.success(new Email(email));
    }

    return Result<InvalidNameError>.failure(new InvalidNameError('Email is invalid'));
  }

  static isValid(name: string) {
    return true;
  }
}