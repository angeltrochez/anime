import {Request,Response} from "express";

import {Staff, IStaff} from "../models/staff.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class StaffHelpers{

    GetStaff(id_staff: string):Promise<IStaff>{        
        return new Promise<IStaff>( (resolve) => {
            Staff.findById(id_staff,(err:Error,staff:IStaff)=>{
                if(err){
                    console.log(err);
                }
                resolve(staff);
            }); 
        });
    }
}

export class StaffService extends StaffHelpers{

    //FUNCIONES CRUD Staff
    public getStaff(req: Request,res: Response){
        Staff.find({},(err: Error, staff: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(staff);
        });
    }   

    public async GetStaffById(req: Request,res: Response){        
        const my_staff = await super.GetStaff(req.params.id_staff);
        res.status(200).send(my_staff);
    }

    //Payload
    public UpdateStaff(req: Request,res: Response){
        Staff.findByIdAndUpdate(req.params.id_staff,req.body,(err:Error, staff:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( staff? {"updated":true} : {"updated":false} );
        })
    }

    public async DeleteStaff(req: Request, res: Response){   
        Staff.findByIdAndDelete(req.params.id_staff,req.body,(err:Error, staff:any)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json( staff? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
            });    
    }

    public NewStaff(req: Request, res: Response){
        const s = new Staff(req.body);
        s.save((err:Error, staff: IStaff)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( staff? {"successed":true, "Staff": staff } : {"successed":false} );
        });
    } 
}
