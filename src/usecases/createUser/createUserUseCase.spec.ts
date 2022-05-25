import { InMemoryCreateUserRepository } from "./inMemoryCreateUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

const userData = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: '123456',
}

describe('Create user use case', () => {
  it('Should create a user', async () => {
    const usersRepository = new InMemoryCreateUserRepository();
    const user = new CreateUserUseCase(usersRepository);
    const responseOrError = await user.execute(userData);
    const responseValue = responseOrError.getValue();

    expect(responseOrError.error).toBeFalsy();
    expect(responseValue.props.name).toBe(userData.name);
    expect(responseValue.props.password).toBe('');
    expect(usersRepository.users.length).toBe(1);
  });

});