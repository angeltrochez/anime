import {Application} from "express";
import {StaffService} from "../services/staff.services";

export class StaffController{
    private staff_service: StaffService;
    constructor(private app: Application){
        this.staff_service = new StaffService();
        this.routes();
    }
    private routes(){
       //Staff
        this.app.route("/staff/").get(this.staff_service.getStaff);
        this.app.route("/staff").post(this.staff_service.NewStaff);
        this.app.route("/staff/:id_staff")
        .get(this.staff_service.GetStaffById)
        .put(this.staff_service.UpdateStaff)
        .delete(this.staff_service.DeleteStaff);
    }
}