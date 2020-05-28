import mongoose from "mongoose";

export interface IClient extends mongoose.Document {
    nickname: string;
    contrasena: string;
    tarjeta: string;
    expTarjeta:number;
    titularTrajeta:string;
    cvvTarjeta:number
}

const ClientSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    contrasena: {type: String, required: true},
    tarjeta: { type: String, required: true },
    expTarjeta:{type: Number, required: true},
    titularTrajeta: { type: String, required: true },
    cvvTarjeta:{type: Number, required: true}
});

export const Client = mongoose.model<IClient>("Client", ClientSchema);