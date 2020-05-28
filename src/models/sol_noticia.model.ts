import mongoose from "mongoose";
import { Stream } from "stream";

export interface ISolNoticia extends mongoose.Document {
    name: String;
    url: String;
    fecha: Date;
}

const SolNoticiaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    fecha: {type: Date, required:true}
});

export const SolNoticia = mongoose.model<ISolNoticia>("Noticia", SolNoticiaSchema);