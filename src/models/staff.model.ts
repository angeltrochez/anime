import mongoose from "mongoose";
import { Stream } from "stream";

export interface IStaff extends mongoose.Document {
    codEmpleado: number;
    name: String;
    usuario: String;
    contrasena: String;
    fechaIngreso: String;
    puesto:String;
    permisos:String;
}

const StaffSchema = new mongoose.Schema({
    codEmpleado:{type: Number, required: true},
    name: { type: String, required: true },
    usuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    fechaIngreso: {type: String, required:true},
    puesto: {type:String, required:true},
    permisos: {type: String, required:true}
});

export const Staff = mongoose.model<IStaff>("Staff", StaffSchema);