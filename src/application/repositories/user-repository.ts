import { User } from '../../domain/entities/user';

export interface UserRepository {
  getUsers: () => Promise<User[]>
}