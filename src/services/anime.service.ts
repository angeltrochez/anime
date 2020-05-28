import {Request,Response} from "express";

import {Anime, IAnime} from "../models/anime.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class AnimeHelpers{

    GetAnime(filter: any):Promise<IAnime>{        
        return new Promise<IAnime>( (resolve) => {
            Anime.find(filter,(err:Error,anime:IAnime)=>{
                if(err){
                    console.log(err);
                }
                resolve(anime);
            }); 
        });
    }
}

export class AnimeService extends AnimeHelpers{

    //FUNCIONES CRUD ANIME
    public getAnime(req: Request,res: Response){
        Anime.find({},(err: Error, anime: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(anime);
        });
    }   

    public async GetAnimeById(req: Request,res: Response){        
        const anime:any = await super.GetAnime(req.params.id_anime);
        res.status(200).json(anime);
    }

    //Payload
    public async UpdateAnime(req: Request,res: Response){
        const old_anime:any = await super.GetAnime({
            name:req.body.name,
            id_anime: { $nin: [req.params.id] }
        });
        if(old_anime.length === 0){
        Anime.findByIdAndUpdate(req.params.id_anime,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Anime updated successfully"});
            }
        });
        }else{
            res.status(200).json({successed:false});
        }
    }

    public async DeleteAnime(req: Request, res: Response){   
        const old_anime:any = await super.GetAnime({
            id_anime: { $nin: [req.params.id] }
        });
        if(old_anime.length === 0){
        Anime.findByIdAndDelete(req.params.id_anime,req.body,(err:Error, anime:any)=>{
                if(err){
                    res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
                }
                res.status(200).json( anime? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });   
        } 
    }

    public async NewAnime(req: Request, res: Response){
        const s = new Anime(req.body);
        const old_anime:any = await super.GetAnime({name:s.name});

        console.log(s);
        console.log(req.body);
        if( old_anime.length === 0 ){
            await s.save((err:Error, anime: IAnime)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( anime? {successed:true, anime: anime } : {successed:false} );
                }            
            });
        }else{
           res.status(200).json({successed:false});
        }
    } 
}
