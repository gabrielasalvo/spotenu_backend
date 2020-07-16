import express from "express";
import { UserController } from '../Controller/UserController'
import { Genre } from "../model/Genre";
import { GenreDatabase } from "../Data/GenreDatabase";
import { GenreController } from "../Controller/GenreController";
//linha responsável por criar um módulo de rotas no express

export const genreRouter = express.Router();

genreRouter.post("/addgenre", new GenreController().createGenre )