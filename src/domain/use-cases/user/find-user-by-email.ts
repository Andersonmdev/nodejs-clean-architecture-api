import { UserRepository } from '../../interfaces/repositories/user-repository';
import { FindUserByEmailUseCase } from '../../interfaces/use-cases/user/find-user-by-email-use-case';

export class FindUserByEmail implements FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}