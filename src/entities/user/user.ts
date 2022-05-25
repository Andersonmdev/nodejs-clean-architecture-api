import { Result } from '../../utils/result';
import { Entity } from '../Entity';
import { Email } from './email';
import { Name } from './name';
import { Password } from './password';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserProps, id?: string) {
    const nameOrError = Name.create(props.name);
    const emailOrError = Email.create(props.email);
    const passwordOrError = Password.create(props.password);

    const userPropsResult = Result.combine(
      [nameOrError, emailOrError, passwordOrError],
    );

    if (userPropsResult.isFailure) {
      return Result.failure(userPropsResult.error);
    }

    return Result<User>.success(new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      }, id)
    );
  }
}