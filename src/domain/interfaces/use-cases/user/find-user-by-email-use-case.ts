import { User } from '../../../entities/user';

export interface FindUserByEmailUseCase {
  execute: (email: string) => Promise<User>
}