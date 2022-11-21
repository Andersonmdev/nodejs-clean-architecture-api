import { z } from 'zod';
import { hash, genSalt } from 'bcryptjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUser } from '../../domain/use-cases/user/create-user';
import { GetAllUsers } from '../../domain/use-cases/user/get-all-users';
import { UserRepositoryPrisma } from '../../application/repositories/prisma/user-repository-prisma';

interface UserInput {
  email: string
  password: string
  name: string
}

export class UserController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const userBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(3)
    });

    // TODO: check if user already exists

    const user = userBody.parse(request.body) as UserInput;
    const salt = await genSalt();
    const hashPassword = await hash(user.password, salt);
    user.password = hashPassword;

    const userRepository = new UserRepositoryPrisma();
    // @ts-expect-error
    const createUser = new CreateUser(userRepository);
    await createUser.execute({
      email: user.email,
      password: user.password,
      name: user.name
    });

    return await reply.send({ user });
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = new UserRepositoryPrisma();
    // @ts-expect-error
    const getAllUsers = new GetAllUsers(userRepository);
    const users = await getAllUsers.execute();
    return await reply.send({ users });
  }
}