import { User } from "../../entities/userEntity/user";
import { prisma } from "../../prisma";
import { UsersRepository } from "../UsersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: User): Promise<void> {
    await prisma.user.create({ data: { ...data } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return null;
  }

  async findById(id: string): Promise<User | null> {
    return null;
  }

  async getAll(): Promise<User[]> {
    return [];
  }

  async removeById(id: string): Promise<void> {
  }
}