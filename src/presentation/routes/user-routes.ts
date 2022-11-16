import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user-controller';

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();
  fastify.get('/users', async (request, reply) => await userController.getUsers(request, reply));
  fastify.post('/users', async (request, reply) => await userController.createUser(request, reply));
}