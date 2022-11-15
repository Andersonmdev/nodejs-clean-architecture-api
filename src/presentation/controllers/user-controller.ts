import { z } from 'zod';
import { hash, genSalt } from 'bcryptjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserUseCase } from '../../domain/use-cases/user/create-user';
import { GetAllUsersUseCase } from '../../domain/use-cases/user/get-all-users';
import { UserRepositoryPrisma } from '../../application/repositories/prisma/user-repository-prisma';

export class UserController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const userBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(3)
    });
    const user = userBody.parse(request.body);
    const salt = await genSalt();
    const hashPassword = await hash(user.password, salt);
    user.password = hashPassword;

    const userRepository = new UserRepositoryPrisma();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    await createUserUseCase.execute({
      email: user.email,
      password: user.password,
      name: user.name
    });
    return await reply.send({ user });
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = new UserRepositoryPrisma();
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    const users = await getAllUsersUseCase.execute();
    return await reply.send({ users });
  }
}