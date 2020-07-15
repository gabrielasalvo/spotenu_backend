import express from "express";
import { UserController } from '../Controller/UserController'
import { User } from "../model/User";
//linha responsável por criar um módulo de rotas no express


export const userRouter = express.Router();
userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", new UserController().login);
userRouter.put("/approve", new UserController().approve)
userRouter.get("/bands", new UserController().getBands )
// userRouter.post("/login", new UserController().login);