import { UserRepository } from '../../repositories/user-repository';

export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}