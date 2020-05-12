import {Request,Response} from "express";

import {Episodio, IEpisodio} from "../models/episodio.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class EpisodioHelpers{

    GetEpisodio(id_episodio: string):Promise<IEpisodio>{        
        return new Promise<IEpisodio>( (resolve) => {
            Episodio.findById(id_episodio,(err:Error,episodio:IEpisodio)=>{
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
    public UpdateEpisodio(req: Request,res: Response){
        Episodio.findByIdAndUpdate(req.params.id_episodio,req.body,(err:Error, episodio:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( episodio? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteEpisodio(req: Request, res: Response){   
        Episodio.findByIdAndDelete(req.params.id_episodio,req.body,(err:Error, episodio:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( episodio? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewEpisodio(req: Request, res: Response){
        const e = new Episodio(req.body);
        e.save((err:Error, episodio: IEpisodio)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( episodio? {"successed":true, "Episodio": episodio } : {"successed":false} );
        });
    } 
}
