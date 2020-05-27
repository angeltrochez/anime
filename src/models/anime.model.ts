import mongoose from "mongoose";
import {IEpisodio} from "./episodio.model";
import {IGenero} from "./genero.model";

export interface IAnime extends mongoose.Document {
    name: String;
    estado: String;
    genero: IGenero;
    descripcion: String;
    tipoMiembro:String;
}

const AnimeSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    estado: { type: String, required: true },
    genero:{type: mongoose.Schema.Types.ObjectId, ref:"Genero"},
    descripcion: {type: String, required:true},
    tipoMiembro: {type:String, required:true}
});

export const Anime = mongoose.model<IAnime>("Anime", AnimeSchema);