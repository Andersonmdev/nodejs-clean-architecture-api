import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user-controller';

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.get('/users', userController.getUsers);
}