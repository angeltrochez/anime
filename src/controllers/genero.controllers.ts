import {Application} from "express";
import {GeneroService} from "../services/genero.services";

export class GeneroController{
    private genero_service: GeneroService;
    constructor(private app: Application){
        this.genero_service = new GeneroService();
        this.routes();
    }
    private routes(){
       //Genero
        this.app.route("/generos").get(this.genero_service.getGenero);
        this.app.route("/genero").post(this.genero_service.NewGenero);
        this.app.route("/genero/:id_genero")
        .get(this.genero_service.GetGeneroById)
        .put(this.genero_service.UpdateGenero)
        .delete(this.genero_service.DeleteGenero);
    }
}