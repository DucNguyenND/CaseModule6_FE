import {Time} from "@angular/common";
import {Field} from "./Field";

export class Enterprise{
  private _idEnterprise:number;
  private _nameEnterprise:string;
  private _codeConfirmEnterprise:string;
  private _gmailEnterprise:string;
  private _imgEnterprise:string;
  private _addressMainEnterprise:string;
  private _fieldEnterprise:Field;
  private _describeEnterprise:string;
  private _passwordEnterprise:string;
  private _numberViEnterprise:string;
  private _codeViEnterprise:string;
  private _viEnterprise:number;
  private _statusEnterprise:boolean;
  private _timeRegisterEnterprise:Time;
  private _dateRegisterEnterprise:Date;
  private _statusConfirm:boolean;
  private _ratesEnterprise:number;


  constructor(ratesEnterprise:number,idEnterprise: number, nameEnterprise: string, codeConfirmEnterprise: string, gmailEnterprise: string, imgEnterprise: string, addressMainEnterprise: string, fieldEnterprise: Field, describeEnterprise: string, passwordEnterprise: string, numberViEnterprise: string, codeViEnterprise: string, viEnterprise: number, statusEnterprise: boolean, timeRegisterEnterprise: Time, dateRegisterEnterprise: Date, statusConfirm: boolean) {
    this._idEnterprise = idEnterprise;
    this._nameEnterprise = nameEnterprise;
    this._codeConfirmEnterprise = codeConfirmEnterprise;
    this._gmailEnterprise = gmailEnterprise;
    this._imgEnterprise = imgEnterprise;
    this._addressMainEnterprise = addressMainEnterprise;
    this._fieldEnterprise = fieldEnterprise;
    this._describeEnterprise = describeEnterprise;
    this._passwordEnterprise = passwordEnterprise;
    this._numberViEnterprise = numberViEnterprise;
    this._codeViEnterprise = codeViEnterprise;
    this._viEnterprise = viEnterprise;
    this._statusEnterprise = statusEnterprise;
    this._timeRegisterEnterprise = timeRegisterEnterprise;
    this._dateRegisterEnterprise = dateRegisterEnterprise;
    this._statusConfirm = statusConfirm;
    this._ratesEnterprise=ratesEnterprise;
  }

  get idEnterprise(): number {
    return this._idEnterprise;
  }

  set idEnterprise(value: number) {
    this._idEnterprise = value;
  }

  get nameEnterprise(): string {
    return this._nameEnterprise;
  }

  set nameEnterprise(value: string) {
    this._nameEnterprise = value;
  }

  get codeConfirmEnterprise(): string {
    return this._codeConfirmEnterprise;
  }

  set codeConfirmEnterprise(value: string) {
    this._codeConfirmEnterprise = value;
  }

  get gmailEnterprise(): string {
    return this._gmailEnterprise;
  }

  set gmailEnterprise(value: string) {
    this._gmailEnterprise = value;
  }

  get imgEnterprise(): string {
    return this._imgEnterprise;
  }

  set imgEnterprise(value: string) {
    this._imgEnterprise = value;
  }

  get addressMainEnterprise(): string {
    return this._addressMainEnterprise;
  }

  set addressMainEnterprise(value: string) {
    this._addressMainEnterprise = value;
  }

  get fieldEnterprise(): Field {
    return this._fieldEnterprise;
  }

  set fieldEnterprise(value: Field) {
    this._fieldEnterprise = value;
  }

  get describeEnterprise(): string {
    return this._describeEnterprise;
  }

  set describeEnterprise(value: string) {
    this._describeEnterprise = value;
  }

  get passwordEnterprise(): string {
    return this._passwordEnterprise;
  }

  set passwordEnterprise(value: string) {
    this._passwordEnterprise = value;
  }

  get numberViEnterprise(): string {
    return this._numberViEnterprise;
  }

  set numberViEnterprise(value: string) {
    this._numberViEnterprise = value;
  }

  get codeViEnterprise(): string {
    return this._codeViEnterprise;
  }

  set codeViEnterprise(value: string) {
    this._codeViEnterprise = value;
  }

  get viEnterprise(): number {
    return this._viEnterprise;
  }

  set viEnterprise(value: number) {
    this._viEnterprise = value;
  }

  get statusEnterprise(): boolean {
    return this._statusEnterprise;
  }

  set statusEnterprise(value: boolean) {
    this._statusEnterprise = value;
  }

  get timeRegisterEnterprise(): Time {
    return this._timeRegisterEnterprise;
  }

  set timeRegisterEnterprise(value: Time) {
    this._timeRegisterEnterprise = value;
  }

  get dateRegisterEnterprise(): Date {
    return this._dateRegisterEnterprise;
  }

  set dateRegisterEnterprise(value: Date) {
    this._dateRegisterEnterprise = value;
  }

  get statusConfirm(): boolean {
    return this._statusConfirm;
  }

  set statusConfirm(value: boolean) {
    this._statusConfirm = value;
  }

  get ratesEnterprise(): number {
    return this._ratesEnterprise;
  }

  set ratesEnterprise(value: number) {
    this._ratesEnterprise = value;
  }
}
