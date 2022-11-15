import { User } from '../../domain/entities/user';

export interface UserRepository {
  createUser: (user: User) => Promise<User>
  getUsers: () => Promise<User[]>
}