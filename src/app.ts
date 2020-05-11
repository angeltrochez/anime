import express,{Application} from "express";

import {MainController} from "./controllers/main.controller";
import {ClientController} from "./controllers/client.controllers";
import {StaffController} from "./controllers/staff.controllers";
import {MemberController} from "./controllers/member.controllers";
import {SolNoticiaController} from "./controllers/sol_noticia.controllers"

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

class App{
    public app: Application;
    public mainController: MainController;
    public clientController: ClientController;
    public staffController: StaffController;
    public memberController: MemberController;
    public solNoticiaController: SolNoticiaController;

    constructor(){        
        this.app = express();
        
        this.setConfig();
        this.setMongoDBConfig();
        this.mainController = new MainController(this.app);        
        this.clientController = new ClientController(this.app);
        this.staffController = new StaffController(this.app);
        this.memberController = new MemberController(this.app);
        this.solNoticiaController = new SolNoticiaController(this.app);
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));
        this.app.use(cors());        
    }
    private setMongoDBConfig(){
        mongoose.Promise = global.Promise;
        
        mongoose.connect(process.env.MONGO_URI!,{ useNewUrlParser:true, useUnifiedTopology: true }, (err:any)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Conexion exitosa");
            }
        });
    }
}

export default new App().app;