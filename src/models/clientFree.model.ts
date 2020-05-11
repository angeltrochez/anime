import mongoose from "mongoose";

export interface IClientF extends mongoose.Document {
    nickname: string;
    contrasena: string;
}

const ClientFSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    nickname: { type: String, required: true },
    contrasena: {type: String, required: true}   
});

export const ClientF = mongoose.model<IClientF>("ClientF", ClientFSchema);