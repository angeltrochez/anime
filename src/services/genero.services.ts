import {Request,Response} from "express";

import {Genero, IGenero} from "../models/genero.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class GeneroHelpers{

    GetGenero(filter: any):Promise<IGenero>{        
        return new Promise<IGenero>( (resolve) => {
            Genero.find(filter,(err:Error,genero:IGenero)=>{
                if(err){
                    console.log(err);
                }
                resolve(genero);
            }); 
        });
    }
}

export class GeneroService extends GeneroHelpers{

    //FUNCIONES CRUD Genero
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
    public async UpdateGenero(req: Request,res: Response){
        const old_genero:any = await super.GetGenero({
            name:req.body.name,
            id_genero: { $nin: [req.params.id] }
        });
        if(old_genero.length === 0){
        Genero.findByIdAndUpdate(req.params.id_genero,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Genero updated successfully"});
            }
        });
        }else{
            res.status(200).json({successed:false});
        } 
    }

    public async DeleteGenero(req: Request, res: Response){   
        const old_genero:any = await super.GetGenero({
            id_genero: { $nin: [req.params.id] }
        });
        if(old_genero.length === 0){
        Genero.findByIdAndDelete(req.params.id_genero,req.body,(err:Error, genero:any)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }
            res.status(200).json( genero? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
        });
        }else{
         res.status(200).json({successed:false});
        }    
    }

    public async NewGenero(req: Request, res: Response){
        const gen = new Genero(req.body);
        const old_genero:any = await super.GetGenero({name:gen.name});
        if( old_genero.length === 0 ){
        await gen.save((err:Error, genero: IGenero)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( genero? {successed:true, genero: genero } : {successed:false} );
        });
        }else{
            res.status(200).json({successed:false});
        } 
    } 
}
