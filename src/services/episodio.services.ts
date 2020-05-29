import {Request,Response} from "express";

import {Episodio, IEpisodio} from "../models/episodio.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class EpisodioHelpers{

    GetEpisodio(filter: any):Promise<IEpisodio>{        
        return new Promise<IEpisodio>( (resolve) => {
            Episodio.find(filter,(err:Error,episodio:IEpisodio)=>{
                if(err){
                    console.log(err);
                }
                resolve(episodio);
            }); 
        });
    }
}

export class EpisodioService extends EpisodioHelpers{

    //FUNCIONES CRUD Staff
    public getEpisodio(req: Request,res: Response){
        Episodio.find({},(err: Error, episodio: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(episodio);
        });
    }   

    public async GetEpisodioById(req: Request,res: Response){        
        const my_episodio = await super.GetEpisodio(req.params.id_episodio);
        res.status(200).send(my_episodio);
    }

    //Payload
    public async UpdateEpisodio(req: Request,res: Response){
        const old_episodio:any = await super.GetEpisodio({
            name:req.body.name,
            id_episodio: { $nin: [req.params.id] }
        });
        if(old_episodio.length === 0){
        Episodio.findByIdAndUpdate(req.params.id_episodio,req.body,(err:Error)=>{
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

    public async DeleteEpisodio(req: Request, res: Response){   
        const old_episodio:any = await super.GetEpisodio({
            id_episodio: { $nin: [req.params.id] }
        });
        if(old_episodio.length === 0){
        Episodio.findByIdAndDelete(req.params.id_episodio,req.body,(err:Error, episodio:any)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }
            res.status(200).json( episodio? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
        });
        }else{
         res.status(200).json({successed:false});
        }
    }

    public async NewEpisodio(req: Request, res: Response){
        const epi = new Episodio(req.body);
        const old_episodio:any = await super.GetEpisodio({name:epi.name});
        if( old_episodio.length === 0 ){
        await epi.save((err:Error, episodio: IEpisodio)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( episodio? {successed:true, episodio: episodio } : {successed:false} );
        });
        }else{
        res.status(200).json({successed:false});
        }
    } 
}
