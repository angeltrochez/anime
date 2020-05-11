import {Request,Response} from "express";

import {Member, IMember} from "../models/member.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class MemberHelpers{

    GetMember(id_member: string):Promise<IMember>{        
        return new Promise<IMember>( (resolve) => {
            Member.findById(id_member,(err:Error,member:IMember)=>{
                if(err){
                    console.log(err);
                }
                resolve(member);
            }); 
        });
    }
}

export class MemberService extends MemberHelpers{

    //FUNCIONES CRUD Member
    public getMember(req: Request,res: Response){
        Member.find({},(err: Error, member: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(member);
        });
    }   

    public async GetMemberById(req: Request,res: Response){        
        const my_member = await super.GetMember(req.params.id_member);
        res.status(200).send(my_member);
    }

    //Payload
    public UpdateMember(req: Request,res: Response){
        Member.findByIdAndUpdate(req.params.id_member,req.body,(err:Error, member:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( member? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteMember(req: Request, res: Response){   
        Member.findByIdAndDelete(req.params.id_member,req.body,(err:Error, member:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( member? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewMember(req: Request, res: Response){
        const m = new Member(req.body);
        m.save((err:Error, member: IMember)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( member? {"successed":true, "Member": member } : {"successed":false} );
        });
    } 
}
