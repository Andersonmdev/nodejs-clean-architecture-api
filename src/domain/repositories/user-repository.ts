import { User } from '../entities/user';

export interface UserRepository {
  createUser: (user: User) => Promise<User>
  updateUser: (user: User) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  getUsers: () => Promise<User[]>
}