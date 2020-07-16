import express from "express";
import { UserController } from '../Controller/UserController'
import { Genre } from "../model/Genre";
import { GenreDatabase } from "../Data/GenreDatabase";
//linha responsável por criar um módulo de rotas no express

export const genreRouter = express.Router();

genreRouter.post("/addgenre", new GenreDatabase().createGenre )