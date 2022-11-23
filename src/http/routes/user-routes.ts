import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { CreateUserUseCase } from '../../domain/interfaces/use-cases/user/create-user-use-case';

export function setUserRoutes(
  fastify: FastifyInstance,
  createUserUseCase: CreateUserUseCase
) {
  fastify.post('/users', async (request, reply) => {
    const userBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(3)
    });
    const user = userBody.parse(request.body);
    await createUserUseCase.execute(user);
    void reply.status(201).send({ user });
  });
}