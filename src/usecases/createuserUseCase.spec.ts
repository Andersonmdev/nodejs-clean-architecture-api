import { InMemoryCreateUserRepository } from "../tests/repositories/inMemoryCreateUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

describe('Create user use case', () => {
  it('Should create a user', async () => {
    const usersRepository = new InMemoryCreateUserRepository();
    const user = new CreateUserUseCase(usersRepository);
    const resposta = await user.execute({
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    });

    expect(resposta).toBeTruthy();
    expect(resposta.props.name).toBe('John Doe');
    expect(resposta.props.password).toBe('');
    expect(usersRepository.users.length).toBe(1);
  });

});