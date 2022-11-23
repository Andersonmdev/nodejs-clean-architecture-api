import * as dotenv from 'dotenv';
import { createApp } from './config/app';
import { UserRepositoryPrisma } from './data/prisma/user-repository-prisma';
import { CreateUser } from './domain/use-cases/user/create-user';
import { setUserRoutes } from './http/routes/user-routes';

dotenv.config();

async function bootstrap() {
  const fastify = await createApp();
  setUserRoutes(fastify, new CreateUser(new UserRepositoryPrisma()));

  const host = process.env.HOST ?? '0.0.0.0';
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;
  await fastify.listen({ port, host });
}

void bootstrap();