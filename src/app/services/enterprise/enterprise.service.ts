import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enterprise} from "../../model/Enterprise";
import {FormJob} from "../../model/FormJob";
import {Regime} from "../../model/Regime";
import {PostEnterprise} from "../../model/PostEnterprise";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http:HttpClient) { }

  getViByIdEnterprise(id:number): Observable<number>{
    return this.http.get<any>(`http://localhost:8080/enterprise/vi/${id}`);
  }
  findEnterpriseByName(name:string):Observable<Enterprise>{
     return this.http.get<any>(`http://localhost:8080/enterprise/findEnterprise/${name}`)
  }
  findEnterpriseById(id:number):Observable<Enterprise>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findEnterpriseId/${id}`)
  }
  rechargeWallet(id:number,numberMoney:number):Observable<Enterprise>{
    return this.http.post<any>(`http://localhost:8080/enterprise/rechargeWallet/${id}/${numberMoney}`,"");
  }
  changeCodeVi(id:number,codeVi:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/changeCodeVi/${id}/${codeVi}`,"");
  }
  setStatusEnterpriseTo1(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/setStatusEnterpriseTo1/${id}`,);
  }
  setStatusEnterpriseTo0(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/setStatusEnterpriseTo0/${id}`,);
  }
  findAllFormJob():Observable<FormJob[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllFormJob`,);
  }
  findAllRegime():Observable<Regime[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllRegime`,);
  }
  savePost(post:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/savePost`,post);
  }
  findAllByIdEnterprise(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllByIdEnterprise/${id}`,);
  }
  listPostVipByEnterprise(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/listPostVipByEnterprise/${id}`,);

  }
  listPostThuongByEnterprise(id:number):Observable<PostEnterprise[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/listPostThuongByEnterprise/${id}`,);
  }
  statusPost(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/enterprise/statusPost/${id}`,);
  }
  openKeyPost(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/enterprise/openKeyPost/${id}`,);
  }

  //Call Api tìm kiếm

  findPostById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/enterprise/findPostById/${id}`,);
  }

  findPostByAddress(address: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/enterprise/findAddress/${address}`,);
  }

  findByNamePost(name : string) : Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findByNamePost/${name}`);
  }

  findByNameEnterprise(id : number) : Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findByEnterprise/${id}`);
  }

  findPostBySalary(salary:number) : Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findSalary/${salary}`);
  }


  listNorifiFromApplyUser(id: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/listNotiyApply/${id}`,);
  }
  confirmNotifi(id:number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/confirmUserApply/${id}`,"");

  }
  editPost(post:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/editpost`,post);
  }
  allUserApplyByIdPost(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/allUserApplyByIdPost/${id}`);
  }
//get userApply theo id
  getUserApplyById(id:number){
    return this.http.get<any>(`http://localhost:8080/enterprise/userApplyById/${id}`);
  }
//  Thực hiện giao dịch nạp tiền
  saveTransWallet(transWallet:any):Observable<any> {
    return this.http.post<any>(`http://localhost:8080/enterprise/saveTransWallet`,transWallet);
  }
  getTransWalletHrByIdEnter(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/transWalletHrByIdEnter/${id}`);
  }
  deletePostExpired():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/deletePostExpired`);
  }
  editProfile(enterprise: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/enterprise/editProfile/`, enterprise);
  }
}
