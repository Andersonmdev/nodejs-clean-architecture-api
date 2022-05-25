import { User } from "../entities/userEntity/user";

export interface UsersRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  removeById(id: string): Promise<void>;
}