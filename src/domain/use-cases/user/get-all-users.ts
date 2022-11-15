import { UserRepository } from '../../../application/repositories/user-repository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute() {
    const users = await this.userRepository.getUsers();
    const userWithoutPassword = users.map(user => {
      // @ts-expect-error
      delete user.password;
      return user;
    });
    return userWithoutPassword;
  }
}