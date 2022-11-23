import * as dotenv from 'dotenv';
import { createApp } from './config/app';

dotenv.config();

async function bootstrap() {
  const fastify = await createApp();
  const host = process.env.HOST ?? '0.0.0.0';
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;
  await fastify.listen({ port, host });
}

void bootstrap();