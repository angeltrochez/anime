import mongoose from "mongoose";
import { Stream } from "stream";
import {IAnime} from "./anime.model"

export interface IGenero extends mongoose.Document {
    name: String;
    anime:IAnime;
}

const GeneroSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    anime: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
});

export const Genero = mongoose.model<IGenero>("Genero", GeneroSchema);