import {Request,Response} from "express";

import {Client, IClient} from "../models/clientPrem.model";
import {ClientF, IClientF} from "../models/clientFree.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";




class ClientHelpers{

    GetClientPrem(id_client: string):Promise<IClient>{        
        return new Promise<IClient>( (resolve) => {
            Client.findById(id_client,(err:Error,client:IClient)=>{
                if(err){
                    console.log(err);
                }
                resolve(client);
            }); 
        });
    }

    NumberOfClientsPremBySupplier(client: IClient):Promise<number>{        
        return new Promise<number>( resolve => {
            Client.aggregate([
                { "$match": { "proveedor": client._id }}                
              ],(err:Error, data:any)=>{
                resolve(data.length);
              }) 
        });
    }

    GetClientFree(id_client: string):Promise<IClientF>{        
        return new Promise<IClientF>( (resolve) => {
            ClientF.findById(id_client,(err:Error,client:IClientF)=>{
                if(err){
                    console.log(err);
                }
                resolve(client);
            }); 
        });
    }

    NumberOfClientsFreeBySupplier(client: IClientF):Promise<number>{        
        return new Promise<number>( resolve => {
            ClientF.aggregate([
                { "$match": { "proveedor": client._id }}                
              ],(err:Error, data:any)=>{
                resolve(data.length);
              }) 
        });
    }

}

export class ClientService extends ClientHelpers{

    //FUNCIONES CRUD ClientesPremiun
    public getClientPrem(req: Request,res: Response){
        Client.find({},(err: Error, clients: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(clients);
        });
    }   

    public async GetClientPremById(req: Request,res: Response){        
        const my_client = await super.GetClientPrem(req.params.id_client);
        res.status(200).send(my_client);
    }

    //Payload
    public UpdateClientPrem(req: Request,res: Response){
        console.log("entro");
        Client.findByIdAndUpdate(req.params.id_client,req.body,(err:Error, client:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( client? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteClientPrem(req: Request, res: Response){   
        Client.findByIdAndDelete(req.params.id_client,req.body,(err:Error, client:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( client? {"deleted":true, "message":"Sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewClientPrem(req: Request, res: Response){
        const c = new Client(req.body);
        c.save((err:Error, client: IClient)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( client? {"successed":true, "Cliente": client } : {"successed":false} );
        });
    } 

    //FUNCIONES CRUD ClientesFree
    public getClientFree(req: Request,res: Response){
        ClientF.find({},(err: Error, clients: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(clients);
        });
    }   

    public async GetClientFreeById(req: Request,res: Response){        
        const my_client = await super.GetClientFree(req.params.id_client);
        res.status(200).send(my_client);
    }

    //Payload
    public UpdateClientFree(req: Request,res: Response){
        console.log("entro");
        ClientF.findByIdAndUpdate(req.params.id_client,req.body,(err:Error, client:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( client? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteClientFree(req: Request, res: Response){   
        ClientF.findByIdAndDelete(req.params.id_client,req.body,(err:Error, client:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( client? {"deleted":true, "message":"Sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewClientFree(req: Request, res: Response){
        const c = new ClientF(req.body);
        c.save((err:Error, client: IClientF)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( client? {"successed":true, "Cliente": client } : {"successed":false} );
        });
    } 

}
