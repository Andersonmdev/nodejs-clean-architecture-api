import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/auth-controller';

const authController = new AuthController();

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request, reply) => await authController.login(fastify, request, reply));
}