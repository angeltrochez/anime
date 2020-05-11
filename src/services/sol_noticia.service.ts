import {Request,Response} from "express";

import {SolNoticia, ISolNoticia} from "../models/sol_noticia.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class SolNoticiaHelpers{

    GetSolNoticia(id_noticia: string):Promise<ISolNoticia>{        
        return new Promise<ISolNoticia>( (resolve) => {
            SolNoticia.findById(id_noticia,(err:Error,noticia:ISolNoticia)=>{
                if(err){
                    console.log(err);
                }
                resolve(noticia);
            }); 
        });
    }
}

export class SolNoticiaService extends SolNoticiaHelpers{

    //FUNCIONES CRUD Solicitud de Noticias
    public getSolNoticia(req: Request,res: Response){
        SolNoticia.find({},(err: Error, noticia: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(noticia);
        });
    }   

    public async GetSolNoticiaById(req: Request,res: Response){        
        const my_solNoticia = await super.GetSolNoticia(req.params.id_noticia);
        res.status(200).send(my_solNoticia);
    }

    //Payload
    public UpdateSolNoticia(req: Request,res: Response){
        SolNoticia.findByIdAndUpdate(req.params.id_noticia,req.body,(err:Error, noticia:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( noticia? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteSolNoticia(req: Request, res: Response){   
        SolNoticia.findByIdAndDelete(req.params.id_noticia,req.body,(err:Error, noticia:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( noticia? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewSolNoticia(req: Request, res: Response){
        const sn = new SolNoticia(req.body);
        sn.save((err:Error, noticia: ISolNoticia)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( noticia? {"successed":true, "Member": noticia } : {"successed":false} );
        });
    } 
}
