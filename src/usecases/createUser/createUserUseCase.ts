import { User } from '../../entities/userEntity/user';
import { UsersRepository } from '../../repositories/UsersRepository';
import { Result } from '../../utils/result';

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
    const userOrError = User.create(data);

    if (userOrError.isFailure) {
      return userOrError;
    }

    const user: User = userOrError.getValue()
    await this.usersRepository.create(user);
    user.props.password = '';

    return Result<User>.success(user);
  }
}