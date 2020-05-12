import mongoose from "mongoose";
import { Stream } from "stream";

export interface IEpisodio extends mongoose.Document {
    name: String;
    numero: Number;
    duracion: String;
    archivo: String;
    anime:String;
    staff:String;
}

const EpisodioSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    numero: { type: Number, required: true },
    duracion: {type: String, required: true },
    archivo: {type: String, required:true},
    anime: {type:String, required:true},
    staff: {type:String, required:true}
});

export const Episodio = mongoose.model<IEpisodio>("Episodio", EpisodioSchema);