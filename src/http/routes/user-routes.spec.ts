import { FastifyInstance } from 'fastify';
import { createApp } from '../../config/app';
import { setUserRoutes } from './user-routes';
import { CreateUserUseCase } from '../../domain/interfaces/use-cases/user/create-user-use-case';

class MockCreateUserUseCase implements CreateUserUseCase {
  // @ts-expect-error
  async execute() {
    throw new Error('Method not implemented.');
  }
}

describe('User Routes', () => {
  let fastify: FastifyInstance;
  let mockCreateUserUseCase: MockCreateUserUseCase;

  beforeAll(async () => {
    fastify = await createApp(true);
    mockCreateUserUseCase = new MockCreateUserUseCase();
    // @ts-expect-error
    setUserRoutes(fastify, mockCreateUserUseCase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    jest.spyOn(mockCreateUserUseCase, 'execute').mockImplementation(async () => await Promise.resolve());
    const res = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: {
        email: 'joe@test.com',
        password: '1111111111111111',
        name: 'Joe'
      }
    });
    expect(res.statusCode).toBe(201);
  });
});