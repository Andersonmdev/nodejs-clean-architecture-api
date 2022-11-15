import { prisma } from './prisma';
import { User } from '../../../domain/entities/user';
import { UserRepository } from '../user-repository';

export class UserRepositoryPrisma implements UserRepository {
  async createUser(user: User) {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name
      }
    });
    return user;
  };

  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}