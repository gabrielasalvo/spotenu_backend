import express from "express";
import { AlbumController } from '../Controller/AlbumController'
import { Album } from "../model/Album";

export const albumRouter = express.Router();

albumRouter.post("/createalbum", new AlbumController().createAlbum);