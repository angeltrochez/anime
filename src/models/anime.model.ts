import mongoose from "mongoose";
import { Stream } from "stream";

export interface IAnime extends mongoose.Document {
    name: String;
    estado: String;
    episodios: String;
    descripcion: String;
    tipoMiembro:String;
}

const AnimeSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    estado: { type: String, required: true },
    episodios: { type: String, required: true },
    descripcion: {type: String, required:true},
    tipoMiembro: {type:String, required:true}
});

export const Anime = mongoose.model<IAnime>("Anime", AnimeSchema);