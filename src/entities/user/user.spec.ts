import { InvalidNameError } from "./errors/invalidName";
import { User } from "./user";

const userData = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '123456',
}

describe('User entity', () => {
  it('should not create a user name with less than 2 characters', async () => {
    const name = 'a';
    const userOrError = User.create({
      name: name,
      email: userData.email,
      password: userData.password,
    })

    expect(userOrError.error).toBeInstanceOf(InvalidNameError);
  })

  it('should not create a user name with more than 50 characters', async () => {
    let name = '';
    for (let i = 0; i < 51; i++) {
      name += 'a';
    }
    const userOrError = User.create({
      name: name,
      email: userData.email,
      password: userData.password,
    })

    expect(userOrError.error).toBeInstanceOf(InvalidNameError);
  })

})