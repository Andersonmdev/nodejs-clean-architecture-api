import { User } from "./user";
import { InvalidNameError } from "./errors/invalidName";
import { InvalidEmailError } from "./errors/invalidEmail";
import { InvalidPasswordError } from "./errors/invalidPassword";

const userData = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '123456',
}

describe('User entity', () => {
  it('should not create a user name with less than 2 characters', () => {
    const name = 'a';
    const userOrError = User.create({
      name: name,
      email: userData.email,
      password: userData.password,
    });

    expect(userOrError.error).toBeInstanceOf(InvalidNameError);
  });

  it('should not create a user name with more than 50 characters', () => {
    let name = '';
    for (let i = 0; i < 51; i++) {
      name += 'a';
    }
    const userOrError = User.create({
      name: name,
      email: userData.email,
      password: userData.password,
    });

    expect(userOrError.error).toBeInstanceOf(InvalidNameError);
  });

  it('should not create a user with an invalid email', () => {
    const email = 'invalidEmail';
    const userOrError = User.create({
      name: userData.name,
      email: email,
      password: userData.password,
    });

    expect(userOrError.error).toBeInstanceOf(InvalidEmailError);
  });

  it('should not create a user with an invalid password', () => {
    const password = '123';
    const userOrError = User.create({
      name: userData.name,
      email: userData.email,
      password: password,
    });

    expect(userOrError.error).toBeInstanceOf(InvalidPasswordError);
  });

  it('should create a user', () => {
    const userOrError = User.create(userData);
    const user = userOrError.getValue();
    const userProps = user.props;

    expect(userOrError.error).toBeFalsy();
    expect(userProps.name).toBe(userData.name);
    expect(userProps.email).toBe(userData.email);
    expect(user.props.password).toBe(userData.password);
    expect(user.props.createdAt).toBeInstanceOf(Date);
  });

})