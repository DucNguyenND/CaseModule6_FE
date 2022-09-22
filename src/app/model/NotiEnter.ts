import {UserApply} from "./UserApply";
import {Enterprise} from "./Enterprise";
import {Time} from "@angular/common";

export class NotiEnter{
   id:number

  userApply:UserApply

  enterprise:Enterprise

  timeApply:Time

  dateApply:Date

  statusConfirm:boolean

  constructor(id: number, userApply: UserApply, enterprise: Enterprise, timeApply: Time, dateApply: Date, statusConfirm: boolean) {
    this.id = id;
    this.userApply = userApply;
    this.enterprise = enterprise;
    this.timeApply = timeApply;
    this.dateApply = dateApply;
    this.statusConfirm = statusConfirm;
  }
}
