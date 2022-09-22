import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {LoginService} from "../../services/login/login.service";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {UserApply} from "../../model/UserApply";

@Component({
  selector: 'app-deltal',
  templateUrl: './deltal.component.html',
  styleUrls: ['./deltal.component.css']
})
export class DeltalComponent implements OnInit {
  lisApply!:PostEnterprise[];
  postEnterpriseDetail!:PostEnterprise;
  userApply!:UserApply;
  page:number =1;
  constructor(private userService: UserService,private enterpriseService:EnterpriseService,private loginService: LoginService) { }
  ngOnInit(): void {
      this.getListApply();
  }
  getListApply(){
    this.userService.showListApply(this.loginService.getUserToken().id,this.page).subscribe((data) => {
      this.lisApply = data;
    })
  }
  showPost(idPost: number){
    this.enterpriseService.findPostById(idPost).subscribe((data) => {
      this.postEnterpriseDetail = data;
    })
    this.userService.findImgCvApply(this.loginService.getUserToken().id,idPost).subscribe((data) => {
      this.userApply = data;

    })
  }
  pageChange(page:number){
    this.page =page;
    let pageChange = document.getElementsByClassName("pageChange");
    // @ts-ignore
    pageChange[this.page-1].style.background="#FF4F57";
    for(let i=0;i<pageChange.length;i++){
      if(i!== this.page-1){
        // @ts-ignore
        pageChange[i].style.background="#fff";
      }
    }
    this.getListApply();
  }
  preveAfter(){
    let pageChange = document.getElementsByClassName("pageChange");
    // @ts-ignore
    pageChange[this.page].style.background="#FF4F57";
    for(let i=0;i<pageChange.length;i++){
      if(i!== this.page){
        // @ts-ignore
        pageChange[i].style.background="#fff";
      }
    }
    this.page=this.page+1;
    this.getListApply();
    console.log(this.page)
  }
  preveBefore(){
    console.log(this.page)
    let pageChange = document.getElementsByClassName("pageChange");
    // @ts-ignore
    pageChange[this.page-2].style.background="#FF4F57";
    for(let i=0;i<pageChange.length;i++){
      if(i!== this.page-2){
        // @ts-ignore
        pageChange[i].style.background="#fff";
      }
    }
    this.page=this.page-1;
    this.getListApply();

  }
}
