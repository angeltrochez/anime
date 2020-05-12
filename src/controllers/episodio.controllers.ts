import {Application} from "express";
import {EpisodioService} from "../services/episodio.services";

export class EpisodioController{
    private episodio_service: EpisodioService;
    constructor(private app: Application){
        this.episodio_service = new EpisodioService();
        this.routes();
    }
    private routes(){
       //Episodio
        this.app.route("/anime/:id_anime/episodios").get(this.episodio_service.getEpisodio);
        this.app.route("/anime/:id_anime/episodio").post(this.episodio_service.NewEpisodio);
        this.app.route("/anime/:id_anime/episodio/:id_episodio")
        .get(this.episodio_service.GetEpisodioById)
        .put(this.episodio_service.UpdateEpisodio)
        .delete(this.episodio_service.DeleteEpisodio);
    }
}