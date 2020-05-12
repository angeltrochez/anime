import {Request,Response} from "express";

import {Genero, IGenero} from "../models/genero.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class GeneroHelpers{

    GetGenero(id_genero: string):Promise<IGenero>{        
        return new Promise<IGenero>( (resolve) => {
            Genero.findById(id_genero,(err:Error,genero:IGenero)=>{
                if(err){
                    console.log(err);
                }
                resolve(genero);
            }); 
        });
    }
}

export class GeneroService extends GeneroHelpers{

    //FUNCIONES CRUD Staff
    public getGenero(req: Request,res: Response){
        Genero.find({},(err: Error, genero: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(genero);
        });
    }   

    public async GetGeneroById(req: Request,res: Response){        
        const my_genero = await super.GetGenero(req.params.id_genero);
        res.status(200).send(my_genero);
    }

    //Payload
    public UpdateGenero(req: Request,res: Response){
        Genero.findByIdAndUpdate(req.params.id_genero,req.body,(err:Error, genero:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( genero? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteGenero(req: Request, res: Response){   
        Genero.findByIdAndDelete(req.params.id_genero,req.body,(err:Error, genero:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( genero? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewGenero(req: Request, res: Response){
        const e = new Genero(req.body);
        e.save((err:Error, genero: IGenero)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( genero? {"successed":true, "Genero": genero } : {"successed":false} );
        });
    } 
}
