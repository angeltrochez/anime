import {Request,Response} from "express";

import {Staff, IStaff} from "../models/staff.model";

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class StaffHelpers{

    GetStaff(filter: any):Promise<IStaff>{        
        return new Promise<IStaff>( (resolve) => {
            Staff.find(filter,(err:Error,staff:IStaff)=>{
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
    public async UpdateStaff(req: Request,res: Response){
        const old_staff:any = await super.GetStaff({
            name:req.body.name,
            id_staff: { $nin: [req.params.id] }
        });
        if(old_staff.length === 0){
        Staff.findByIdAndUpdate(req.params.id_staff,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Staff updated successfully"});
            }
        });
        }else{
            res.status(200).json({successed:false});
        }
    }

    public async DeleteStaff(req: Request, res: Response){   
        const old_staff:any = await super.GetStaff({
            id_staff: { $nin: [req.params.id] }
        });
        if(old_staff.length === 0){
        Staff.findByIdAndDelete(req.params.id_staff,req.body,(err:Error, staff:any)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }
            res.status(200).json( staff? {"deleted":true, "message":"Eliminado sin error"} : {"deleted":false,"message":"Un error ocurrio con el server, vuela a intentar"} );
        });
        }else{
         res.status(200).json({successed:false});
        }  
    }

    public async NewStaff(req: Request, res: Response){
        const st = new Staff(req.body);
        const old_staff:any = await super.GetStaff({name:st.name});
        if( old_staff.length === 0 ){
        st.save((err:Error, staff: IStaff)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( staff? {successed:true, staff: staff } : {successed:false} );
        });
        }else{
            res.status(200).json({successed:false});
        }
    } 
}
