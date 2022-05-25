import { User } from '../entities/user';
import { UsersRepository } from '../repositories/UsersRepository';

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class CreateUserUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: CreateUserUseCaseRequest) {
    const user = User.create(data);
    await this.usersRepository.create(user);
    user.props.password = '';
    return user;
  }
}