import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user-controller';

const userController = new UserController();

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', userController.getUsers);
}