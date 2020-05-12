import {Application} from "express";
import {GeneroService} from "../services/genero.services";

export class GeneroController{
    private genero_service: GeneroService;
    constructor(private app: Application){
        this.genero_service = new GeneroService();
        this.routes();
    }
    private routes(){
       //Episodio
        this.app.route("/anime/generos").get(this.genero_service.getGenero);
        this.app.route("/anime/genero").post(this.genero_service.NewGenero);
        this.app.route("/anime/:id_genero")
        .get(this.genero_service.GetGeneroById)
        .put(this.genero_service.UpdateGenero)
        .delete(this.genero_service.DeleteGenero);
    }
}