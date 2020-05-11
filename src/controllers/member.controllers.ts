import {Application} from "express";
import {MemberService} from "../services/member.service";

export class MemberController{
    private member_service: MemberService;
    constructor(private app: Application){
        this.member_service = new MemberService();
        this.routes();
    }
    private routes(){
       //Staff
        this.app.route("/members/").get(this.member_service.getMember);
        this.app.route("/members").post(this.member_service.NewMember);
        this.app.route("/members/:id_staff")
        .get(this.member_service.GetMemberById)
        .put(this.member_service.UpdateMember)
        .delete(this.member_service.DeleteMember);
    }
}