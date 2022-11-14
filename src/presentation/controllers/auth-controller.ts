import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const userBody = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    });
    const user = userBody.parse(request.body);
    console.log(user);
  }
}