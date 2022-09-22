import {Enterprise} from "./Enterprise";
import {Time} from "@angular/common";

export class TransactionHistory{
  id:number;
  enterprise:Enterprise;
  timeTransaction:Time;
  dateTransaction:Date;
  moneyTransaction:number;

  constructor(id: number, enterprise: Enterprise, timeTransaction: Time, dateTransaction: Date, moneyTransaction: number) {
    this.id = id;
    this.enterprise = enterprise;
    this.timeTransaction = timeTransaction;
    this.dateTransaction = dateTransaction;
    this.moneyTransaction = moneyTransaction;
  }
}
