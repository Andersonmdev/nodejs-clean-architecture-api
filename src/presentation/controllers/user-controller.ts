import { FastifyRequest, FastifyReply } from 'fastify';
import { GetAllUsersUseCase } from '../../domain/use-cases/user/get-all-users';
import { UserRepositoryPrisma } from '../../application/repositories/prisma/user-repository-prisma';

export class UserController {
  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = new UserRepositoryPrisma();
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    const users = await getAllUsersUseCase.execute();
    return await reply.send({ users });
  }
}