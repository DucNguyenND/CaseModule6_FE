import {Role} from "./role";

export class UserToken{
  id: number;
  username: string;
  token:string;
  roles: Role;
  constructor(id: number, name: string, token: string, roles: Role){
    this.id = id;
    this.username = name;
    this.token = token;
    this.roles = roles;
  }
}
