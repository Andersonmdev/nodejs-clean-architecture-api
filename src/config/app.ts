import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

export async function createApp(isForTest = false) {
  const fastify = Fastify({ logger: !isForTest });

  if (!isForTest) {
    await fastify.register(cors, { origin: true });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined');
    }
    await fastify.register(jwt, { secret: jwtSecret });
  }

  return await fastify;
};