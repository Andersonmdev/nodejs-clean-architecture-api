import { prisma } from '../../config/prisma';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/interfaces/repositories/user-repository';

export class UserRepositoryPrisma implements UserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password as string,
        name: user.name
      }
    });
    return createdUser;
  }
}