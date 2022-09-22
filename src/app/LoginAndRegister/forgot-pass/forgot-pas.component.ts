import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePassWord} from "../../model/ChangePassWord";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {AppUser} from "../../model/AppUser";
import {Enterprise} from "../../model/Enterprise";

@Component({
  selector: 'app-forgot-pas',
  templateUrl: './forgot-pas.component.html',
  styleUrls: ['./forgot-pas.component.css']
})
export class ForgotPasComponent implements OnInit {
checkpass!:boolean;
  appUser!: AppUser[];
  enterprise!: Enterprise[];
  setPassWord!:ChangePassWord;
  checkEmail!: boolean
  constructor( private loginService:LoginService, private router: Router) {

  }

  ngOnInit(): void {
    this.checkpass=true;
    this.checkEmail=true;
    this.loginService.findAllEnterprise().subscribe((data) => {
      this.enterprise = data;
    });
    this.loginService.findAllUser().subscribe((data) => {
      this.appUser = data;
    });
  }
  changePasswordForm = new FormGroup({
    email: new FormControl("",Validators.required),
    passwordNew: new FormControl("",Validators.required),
    enterPassword: new FormControl("",Validators.required),
  })
  changePassword(){
    let formchange=this.changePasswordForm.value
    console.log("okok")
    console.log("okok")
    console.log(formchange)
     if (this.checkpass){
       let pass={
          gmail:formchange.email,
         password:formchange.passwordNew,
       }
       this.loginService.changePassword(pass).subscribe((data) => {
         alert("Đổi mật khẩu thành công")
         this.router.navigate([""]);
       });
}
}
  checkpassword(){
    this.checkpass=true;
    let formchange=this.changePasswordForm.value
    if (formchange.passwordNew!=formchange.enterPassword){
      this.checkpass=false
    }
  }
  checkEmailU(){
    this.checkEmail=false;
    let emailcheck=this.changePasswordForm.value.email
    for (let i = 0; i < this.appUser.length; i++) {
      if (emailcheck==this.appUser[i].email){
        this.checkEmail=true
        break;
      }
    }
    for (let i = 0; i < this.enterprise.length; i++) {
      if (emailcheck==this.enterprise[i].gmailEnterprise){
        this.checkEmail=true
        break;
      }
    }
    console.log(this.checkEmail)
  }

}
