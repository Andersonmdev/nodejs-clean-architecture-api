import { UserRepository } from '../../interfaces/repositories/user-repository';
import { GetAllUsersUseCase } from '../../interfaces/use-cases/user/get-all-users-use-case';

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute() {
    const users = await this.userRepository.getUsers();
    const usersWithoutPassword = users.map(user => {
      delete user.password;
      return user;
    });
    return usersWithoutPassword;
  }
}