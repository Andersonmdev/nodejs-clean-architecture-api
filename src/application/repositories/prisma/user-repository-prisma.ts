import { prisma } from './prisma';
import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/interfaces/repositories/user-repository';

export class UserRepositoryPrisma implements UserRepository {
  async createUser(user: User) {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password as string,
        name: user.name
      }
    });
    return user;
  };

  // @ts-expect-error
  async updateUser(user: User) {
    throw new Error('Method not implemented.');
  }

  // @ts-expect-error
  async findById(id: string) {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}