import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(user: User) {
    return await this.userRepository.createUser(user);
  }
}