import {Application} from "express";
import {AnimeService} from "../services/anime.service";

export class AnimeController{
    private anime_service: AnimeService;
    constructor(private app: Application){
        this.anime_service = new AnimeService();
        this.routes();
    }
    private routes(){
       //Anime
        this.app.route("/animes/").get(this.anime_service.getAnime);
        this.app.route("/anime").post(this.anime_service.NewAnime);
        this.app.route("/anime/:id_anime")
        .get(this.anime_service.GetAnimeById)
        .put(this.anime_service.UpdateAnime)
        .delete(this.anime_service.DeleteAnime);
    }
}