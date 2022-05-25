import { Express } from 'express';
import { userRoutes } from './routes/userRoutes';

export function routes(app: Express, prefix = '/api') {
  app.use(`/${prefix}/user`, userRoutes);
}