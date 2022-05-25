import express from 'express';

export const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('Hello World!');
});