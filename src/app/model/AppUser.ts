// Đức
import {Role} from "./role";

export class AppUser{
  public id:number;
  public username:string;
  public email:string;
  public password:string;
  public roles:Role[];


  constructor(id: number, username: string, email: string, password: string, roles: Role[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
