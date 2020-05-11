import {Application} from "express";
import {SolNoticiaService} from "../services/sol_noticia.service";

export class SolNoticiaController{
    private solNoticia_service: SolNoticiaService;
    constructor(private app: Application){
        this.solNoticia_service = new SolNoticiaService();
        this.routes();
    }
    private routes(){
       //Solicitud de Noticias
        this.app.route("/SolicitudNoticias/").get(this.solNoticia_service.getSolNoticia);
        this.app.route("/SolicitudNoticia").post(this.solNoticia_service.NewSolNoticia);
        this.app.route("/SolicitudNoticia/:id_noticia")
        .get(this.solNoticia_service.GetSolNoticiaById)
        .put(this.solNoticia_service.UpdateSolNoticia)
        .delete(this.solNoticia_service.DeleteSolNoticia);
    }
}