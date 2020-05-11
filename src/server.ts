import app from "./app";
import {config} from "dotenv";
import {resolve} from "path";

config({path:resolve(__dirname,"../../.env")});

app.listen(3001, ()=>{
    console.log("Server web prenido en puerto 3000");
});

