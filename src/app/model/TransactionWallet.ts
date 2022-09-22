import {Enterprise} from "./Enterprise";
import {Time} from "@angular/common";

export class TransactionWallet{
   id:number
   enterprise:Enterprise
   numberMoney:number
   imgTransaction:string
   timeTransaction:Time
   dateTransaction:Date
   statusConfirm:boolean

  constructor(id: number, enterprise: Enterprise, numberMoney: number, imgTransaction: string, timeTransaction: Time, dateTransaction: Date, statusConfirm: boolean) {
    this.id = id;
    this.enterprise = enterprise;
    this.numberMoney = numberMoney;
    this.imgTransaction = imgTransaction;
    this.timeTransaction = timeTransaction;
    this.dateTransaction = dateTransaction;
    this.statusConfirm = statusConfirm;
  }
}
