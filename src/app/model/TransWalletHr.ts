import {ViAdmin} from "./ViAdmin";
import {Enterprise} from "./Enterprise";
import {Time} from "@angular/common";

export class TransWalletHr{

  id:number
  viAdmin:ViAdmin
  enterprise:Enterprise
  moneyReceive:number
  moneyAway:number
  moneyDiscount:number
  dateTrans:Date
  timeTrans:Time

  constructor(id: number, viAdmin: ViAdmin, enterprise: Enterprise, moneyReceive: number, moneyAway: number, moneyDiscount: number, dateTrans: Date, timeTrans: Time) {
    this.id = id;
    this.viAdmin = viAdmin;
    this.enterprise = enterprise;
    this.moneyReceive = moneyReceive;
    this.moneyAway = moneyAway;
    this.moneyDiscount = moneyDiscount;
    this.dateTrans = dateTrans;
    this.timeTrans = timeTrans;
  }
}
