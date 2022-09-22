import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserToken} from "../../model/UserToken";
import {Field} from "../../model/Field";
import {AppUser} from "../../model/AppUser";
import {Enterprise} from "../../model/Enterprise";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(user: any): Observable<UserToken>{
    return this.http.post<UserToken>("http://localhost:8080/login",user);
  }
  setToken(token: string){
    localStorage.setItem("token",token);
  }
  getToken(){
       return localStorage.getItem("token");
  }
  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }
  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }
  register(enterprise: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/register/enterprise",enterprise);
  }
  registerUser(user:any){
    return this.http.post<any>("http://localhost:8080/register/user",user);
  }
  findAllField():Observable<Field[]>{
    return this.http.get<any>("http://localhost:8080/register/findAllField");
  }
  findFieldById(id:number):Observable<Field>{
    return this.http.get<any>(`http://localhost:8080/register/find/${id}`);
  }
  logout(){
      localStorage.removeItem("userToken");
      localStorage.removeItem("token");
  }
  findAllUser():Observable<AppUser[]>{
    return this.http.get<any>("http://localhost:8080/register/checkUser");
  }
  findAllEnterprise():Observable<Enterprise[]>{
  return this.http.get<any>("http://localhost:8080/register/checkEnterprise");
}



changePassword(checkPassWord:any):Observable<any>{
    return  this.http.post<any>(`http://localhost:8080/changePassword`,checkPassWord);
}


  findPostByUser(post:any){
    return this.http.post<any>("http://localhost:8080/user/findPostUser",post);
  }
  findPostByUserField(post:any){
    return this.http.post<any>("http://localhost:8080/user/findPostUserField",post);
  }
}
