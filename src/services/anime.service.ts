import {Request,Response} from "express";

import {Anime, IAnime} from "../models/anime.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class AnimeHelpers{

    GetStaff(id_anime: string):Promise<IAnime>{        
        return new Promise<IAnime>( (resolve) => {
            Anime.findById(id_anime,(err:Error,anime:IAnime)=>{
                if(err){
                    console.log(err);
                }
                resolve(anime);
            }); 
        });
    }
}

export class AnimeService extends AnimeHelpers{

    //FUNCIONES CRUD Staff
    public getAnime(req: Request,res: Response){
        Anime.find({},(err: Error, anime: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(anime);
        });
    }   

    public async GetAnimeById(req: Request,res: Response){        
        const my_anime = await super.GetStaff(req.params.id_anime);
        res.status(200).send(my_anime);
    }

    //Payload
    public UpdateAnime(req: Request,res: Response){
        Anime.findByIdAndUpdate(req.params.id_anime,req.body,(err:Error, anime:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( anime? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteAnime(req: Request, res: Response){   
        Anime.findByIdAndDelete(req.params.id_anime,req.body,(err:Error, anime:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( anime? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewAnime(req: Request, res: Response){
        const s = new Anime(req.body);
        s.save((err:Error, anime: IAnime)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( anime? {"successed":true, "Anime": anime } : {"successed":false} );
        });
    } 
}
