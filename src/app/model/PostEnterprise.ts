import {Regime} from "./Regime";
import {Field} from "./Field";
import {Enterprise} from "./Enterprise";
import {FormJob} from "./FormJob";
import {Time} from "@angular/common";

export class PostEnterprise{
  idPostEnterprise:number
  namePostEnterprise:string
  addressMainEnterprise:string
  timePostEnterprise:Time
  datePostEnterprise:Date
  statusPostEnterprise:boolean
  salarySmallPostEnterprise:number
  salaryBigPostEnterprise:number
  vacanciesPostEnterprise:string
  expirationDatePostEnterprise:Date
  priorityPostEnterprise:number
  describePostEnterprise:string
  quantityApplyPost:number;
  formJobPostEnterprise:FormJob
  regime:Regime;
  field:Field;
  enterprise:Enterprise;

  constructor(idPostEnterprise: number, namePostEnterprise: string, addressMainEnterprise: string, timePostEnterprise: Time, datePostEnterprise: Date, statusPostEnterprise: boolean, salarySmallPostEnterprise: number, salaryBigPostEnterprise: number, vacanciesPostEnterprise: string, formJobPostEnterprise: FormJob, expirationDatePostEnterprise: Date, priorityPostEnterprise: number, describePostEnterprise: string, quantityApplyPost: number, regime: Regime, field: Field, enterprise: Enterprise) {
    this.idPostEnterprise = idPostEnterprise;
    this.namePostEnterprise = namePostEnterprise;
    this.addressMainEnterprise = addressMainEnterprise;
    this.timePostEnterprise = timePostEnterprise;
    this.datePostEnterprise = datePostEnterprise;
    this.statusPostEnterprise = statusPostEnterprise;
    this.salarySmallPostEnterprise = salarySmallPostEnterprise;
    this.salaryBigPostEnterprise = salaryBigPostEnterprise;
    this.vacanciesPostEnterprise = vacanciesPostEnterprise;
    this.formJobPostEnterprise = formJobPostEnterprise;
    this.expirationDatePostEnterprise = expirationDatePostEnterprise;
    this.priorityPostEnterprise = priorityPostEnterprise;
    this.describePostEnterprise = describePostEnterprise;
    this.quantityApplyPost = quantityApplyPost;
    this.regime = regime;
    this.field = field;
    this.enterprise = enterprise;
  }

}
