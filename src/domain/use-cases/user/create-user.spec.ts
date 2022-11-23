import { User } from '../../entities/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { CreateUser } from './create-user';

class MockUserRepository implements UserRepository {
  // @ts-expect-error
  async createUser(user: User) {
    throw new Error('Method not implemented.');
  }
}

describe('Create User Use Case', () => {
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new MockUserRepository();
  });

  it('should create a user', async () => {
    const user = {
      email: 'joe@test.com',
      password: '1111111111111111',
      name: 'Joe'
    };
    // @ts-expect-error
    jest.spyOn(mockUserRepository, 'createUser').mockImplementation(async (user: User) => await Promise.resolve(user));
    // @ts-expect-error
    const createUser = new CreateUser(mockUserRepository);
    const userCreated = await createUser.execute(user);
    expect(user).toEqual(userCreated);
  });
});