import { Result } from "../../utils/result";
import { InvalidEmailError } from "./errors/invalidEmail";

export class Email {
  static create(email: string) {
    if (Email.isValid(email)) {
      return Result<Email>.success(new Email());
    }

    return Result<InvalidEmailError>.failure(new InvalidEmailError('Email is invalid'));
  }

  static isValid(email: string) {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g);
    if (!email || !emailRegex.test(email)) {
      return false;
    }
    return true;
  }
}