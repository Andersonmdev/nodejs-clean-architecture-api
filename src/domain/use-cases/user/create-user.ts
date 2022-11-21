import { User } from '../../entities/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { CreateUserUseCase } from '../../interfaces/use-cases/user/create-user-use-case';

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(user: User) {
    return await this.userRepository.createUser(user);
  }
}