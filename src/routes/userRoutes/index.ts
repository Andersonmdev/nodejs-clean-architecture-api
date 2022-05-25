import { Router } from "express";
import { createUser } from "./createUser";

export const userRoutes = Router();

userRoutes.post('/', createUser);