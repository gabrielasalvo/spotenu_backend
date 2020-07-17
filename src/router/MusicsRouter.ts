import express from "express";
import { MusicsController } from '../Controller/MusicsController'



import { Musics } from "../model/Musics";

export const musicRouter = express.Router();

musicRouter.post("/createmusic", new MusicsController().createMusics);