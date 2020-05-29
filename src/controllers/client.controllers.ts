import {Application} from "express";
import {ClientService} from "../services/client.service";

export class ClientController{
    private client_service: ClientService;
    constructor(private app: Application){
        this.client_service = new ClientService();
        this.routes();
    }
    private routes(){
       //Cliente Premiun
        this.app.route("/clients/prem").get(this.client_service.getClientPrem);
        this.app.route("/clients/prem").post(this.client_service.NewClientPrem);
        this.app.route("/clients/prem/:id_client")
        .get(this.client_service.getClientPrem)
        .put(this.client_service.UpdateClientPrem)
        .delete(this.client_service.DeleteClientPrem);

        //Cliente Free
        this.app.route("/clients/free").get(this.client_service.getClientFree);
        this.app.route("/clients/free").post(this.client_service.NewClientFree);
        this.app.route("/clients/free/:id_client")
        .get(this.client_service.getClientFree)
        .put(this.client_service.UpdateClientFree)
        .delete(this.client_service.DeleteClientFree);
    }
}