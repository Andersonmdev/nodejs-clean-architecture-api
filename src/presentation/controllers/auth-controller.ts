import { z } from 'zod';
import { compare } from 'bcryptjs';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserRepositoryPrisma } from '../../application/repositories/prisma/user-repository-prisma';
import { FindUserByEmailUseCase } from '../../domain/use-cases/user/find-user-by-email';

export class AuthController {
  async login(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const userBody = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    });
    const user = userBody.parse(request.body);

    const userRepository = new UserRepositoryPrisma();
    // @ts-expect-error
    const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
    const userFound = await findUserByEmailUseCase.execute(user.email);

    if (userFound) {
      const isPasswordValid = await compare(user.password, userFound.password as string);
      if (isPasswordValid) {
        const token = fastify.jwt.sign({
          name: userFound.name,
          email: userFound.email
        }, { expiresIn: '1h' });
        return await reply.send({ token });
      }
    }
  }
}