import { User } from "../../entities/user"
import { UsersRepository } from "../../repositories/UsersRepository"

export class InMemoryCreateUserRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: User): Promise<void> {
    this.users.push(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    return null
  }

  async findById(id: string): Promise<User | null> {
    return null
  }

  async getAll(): Promise<User[]> {
    return []
  }

  async removeById(id: string): Promise<void> {

  }
}