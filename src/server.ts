import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { userRoutes } from './presentation/routes/user-routes';

dotenv.config();

async function bootstrap() {
  const fastify = Fastify({ logger: true });
  await fastify.register(cors, { origin: true });

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not defined');
  }
  await fastify.register(jwt, { secret: jwtSecret });

  await fastify.register(userRoutes);

  const host = process.env.HOST ?? '0.0.0.0';
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;
  await fastify.listen({ port, host });
}

void bootstrap();