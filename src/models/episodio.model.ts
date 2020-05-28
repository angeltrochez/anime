import mongoose from "mongoose";
import {IAnime} from "./anime.model";
import {IStaff} from "./staff.model";

export interface IEpisodio extends mongoose.Document {
    name: String;
    numero: String;
    duracion: String;
    archivo: String;
    anime:IAnime;
    staff:IStaff;
}

const EpisodioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    numero: { type: String, required: true },
    duracion: {type: String, required: true },
    archivo: {type: String, required:true},
    anime: {type: mongoose.Schema.Types.ObjectId, ref:"animes"} ,
    staff: {type: mongoose.Schema.Types.ObjectId, ref:"staffs"} 
});

export const Episodio = mongoose.model<IEpisodio>("Episodio", EpisodioSchema);