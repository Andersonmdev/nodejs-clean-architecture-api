import { prisma } from './prisma';
import { UserRepository } from '../user-repository';

export class UserRepositoryPrisma implements UserRepository {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}