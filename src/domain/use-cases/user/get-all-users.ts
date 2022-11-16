import { UserRepository } from '../../repositories/user-repository';

export class GetAllUsersUseCase {
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