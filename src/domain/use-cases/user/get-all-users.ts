import { UserRepository } from '../../../application/repositories/user-repository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute() {
    return await this.userRepository.getUsers();
  }
}