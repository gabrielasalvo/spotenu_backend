import express from "express";
import { GenreController } from "../Controller/GenreController";


export const genreRouter = express.Router();

genreRouter.post("/addgenre", new GenreController().createGenre )

genreRouter.get("/getgenre", new GenreController().getGenre )