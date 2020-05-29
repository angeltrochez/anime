import mongoose from "mongoose";
import {IGenero} from "./genero.model";

export interface IAnime extends mongoose.Document {
    name: String;
    estado: String;
    genero: IGenero;
    descripcion: String;
    tipoMiembro:String;
}

const AnimeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    estado: { type: String, required: true },
    genero:{type: mongoose.Schema.Types.ObjectId, ref:"generos"},
    descripcion: {type: String, required:true},
    tipoMiembro: {type:String, required:true}
});

export const Anime = mongoose.model<IAnime>("Anime", AnimeSchema);