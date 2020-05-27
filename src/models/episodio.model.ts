import mongoose from "mongoose";
import {IAnime} from "./anime.model";
import {IStaff} from "./staff.model";

export interface IEpisodio extends mongoose.Document {
    name: String;
    numero: Number;
    duracion: String;
    archivo: String;
    anime:IAnime;
    staff:IStaff;
}

const EpisodioSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    numero: { type: Number, required: true },
    duracion: {type: String, required: true },
    archivo: {type: String, required:true},
    anime: {type: mongoose.Schema.Types.ObjectId, ref:"Anime"} ,
    staff: {type: mongoose.Schema.Types.ObjectId, ref:"Staff"} 
});

export const Episodio = mongoose.model<IEpisodio>("Episodio", EpisodioSchema);