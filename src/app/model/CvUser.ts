import {UserToken} from "./UserToken";

export class CvUser{
  id:number;
  name:string;
  imgCV:string;
  mail:string;
  telephone:string;
  appUser:UserToken;

  constructor(id: number, name: string, imgCV: string, mail: string, telephone: string, appUser: UserToken) {
    this.id = id;
    this.name = name;
    this.imgCV = imgCV;
    this.mail = mail;
    this.telephone = telephone;
    this.appUser = appUser;
  }
}
