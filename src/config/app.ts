import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

async function loadFastifyPlugins(fastify: FastifyInstance) {
  await fastify.register(cors, { origin: true });
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not defined');
  }
  await fastify.register(jwt, { secret: jwtSecret });
}

export async function createApp(isForTest = false) {
  const fastify = Fastify({ logger: !isForTest });

  if (!isForTest) {
    await loadFastifyPlugins(fastify);
  }

  return await fastify;
};