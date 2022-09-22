import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  appUser: any;
  enterprise: any;
  checkUsername!: boolean ;
  checkEmail!: boolean ;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.checkUsername=true;
    this.checkEmail=true;
    this.loginService.findAllEnterprise().subscribe((data) => {
      this.enterprise = data;
    });
    this.loginService.findAllUser().subscribe((data) => {
      this.appUser = data;
    });
  }
  registerUserForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email:new FormControl("", Validators.required),
  })
  checkuser(){
    this.checkUsername=true;
    let username= this.registerUserForm.value.username
    for (let i = 0; i < this.appUser.length; i++) {
      if (username==this.appUser[i].username){
        this.checkUsername=false;
        break;
      }
    }
    console.log(this.checkUsername)
    for (let i = 0; i < this.enterprise.length; i++) {
      if (username==this.enterprise[i].nameEnterprise){
        this.checkUsername=false;
        break;
      }
    }
  }


  checkEmailU(){
    this.checkEmail=true;
    let emailuser=this.registerUserForm.value.email
    for (let i = 0; i < this.appUser.length; i++) {
      if (emailuser==this.appUser[i].email){
        this.checkEmail=false
        break;
      }
    }
    for (let i = 0; i < this.enterprise.length; i++) {
      if (emailuser==this.enterprise[i].gmailEnterprise){
        this.checkEmail=false
        break;
      }
    }
    console.log(this.checkEmail)
  }

  registerUser(){
    if (this.checkUsername&&this.checkEmail){
      this.loginService.registerUser(this.registerUserForm.value).subscribe(()=>{
          alert("Đăng ký thành công !");
        this.router.navigate([""])
      })
  }}
}
