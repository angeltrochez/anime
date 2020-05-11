import mongoose from "mongoose";
import { Stream } from "stream";

export interface IMember extends mongoose.Document {
    name: String;
    usuario: String;
    contrasena: String;
    fechaIngreso: Date;
    permisos:String;
}

const MemberSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    name: { type: String, required: true },
    usuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    fechaIngreso: {type: Date, required:true},
    permisos: {type: String, required:true}
});

export const Member = mongoose.model<IMember>("Member", MemberSchema);