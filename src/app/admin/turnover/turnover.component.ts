import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin/admin.service";
import {TransactionHistory} from "../../model/TransactionHistory";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {Enterprise} from "../../model/Enterprise";
import {TransactionWallet} from "../../model/TransactionWallet";
import {ViAdmin} from "../../model/ViAdmin";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransWalletHr} from "../../model/TransWalletHr";
import {set} from "@angular/fire/database";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {

  constructor(private router:Router,private adminService:AdminService,private enterpriseService:EnterpriseService,private loginService:LoginService) { }
  transactionHistoryS !:TransactionHistory[];
  transactionHistoryNowS !:TransactionHistory[];
  postVipByEnterpriseS!:PostEnterprise[];
  postThuongByEnterpriseS!:PostEnterprise[];
  enterpriseOderByRates!:Enterprise[];
  totalMoneyTransaction!:number;
  transWallets!:TransactionWallet[];
  viAdmin! :ViAdmin;
  passViCFValue! :"";
  transWalletById!:TransactionWallet;
  idTransWallet!:number;
  imgTransWallet!:string;
  transWalletHrAll!:TransWalletHr[];
  transWalletHrAllDateNow!:TransWalletHr[];
  dateNow!:Date;
  totalMoneyTransDateNow!:number;
  ngOnInit(): void {
    this.totalTransaction();
    this.getViAdmin()

    this.listTransactionHistory();
    // this.listTransactionHistoryByDateNow();
    this.listEnterpriseOderByRates();
    this.transWalletAll();
    this.getTotalMoneyTransDateNow();
  }
  walletForm = new FormGroup({
    passViAdmin: new FormControl("", Validators.required),
    numberMoney: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+"),Validators.min(5)]),
  })
  toTableComponent(){
      this.router.navigate(["/admin"])
  }
  transWalletAll(){
      this.adminService.listTransWallet().subscribe((data)=>{
         this.transWallets =data;
      })
  }
  listTransactionHistory(){
    this.adminService.listTransactionHistory().subscribe((data)=>{
        this.transactionHistoryS=data;
    })
  }
  listEnterpriseOderByRates(){
    this.adminService.listEnterpriseOderByRates().subscribe((data)=>{
      this.enterpriseOderByRates=data;
    })
  }
  listTransactionHistoryByDateNow(){
      this.adminService.listTransactionHistoryByDateNow().subscribe((data)=>{
          this.transactionHistoryNowS =data;
      })
  }
  listPostVipByEnterprise(id:number){
      this.enterpriseService.listPostVipByEnterprise(id).subscribe((data)=>{
           this.postVipByEnterpriseS =data;
      })

  }
  listPostThuongEnterprise(id:number){
    this.enterpriseService.listPostThuongByEnterprise(id).subscribe((data)=>{
         this.postThuongByEnterpriseS =data;
    })
  }
  totalTransaction(){
     this.adminService.totalTransaction().subscribe((data)=>{
           this.totalMoneyTransaction=data;
     })
  }
  transactionDateNow(){
       // @ts-ignore
    document.getElementById("transactionDateNow").style.display="block";
    // @ts-ignore
    document.getElementById("transactionALL").style.display="none";
  }
  transactionAll(){
    // @ts-ignore
    document.getElementById("transactionDateNow").style.display="none";
    // @ts-ignore
    document.getElementById("transactionALL").style.display="block";
  }
  getViAdmin(){
      this.adminService.getViAdmin().subscribe((data)=>{
          this.viAdmin =data;
      })
  }
  getIdTransWallet(id:number){
    this.idTransWallet =id;
    this.adminService.getTransWalletById(id).subscribe((data)=>{
         this.transWalletById=data;
         if(this.viAdmin.numberMoneyVi<this.transWalletById.numberMoney){
           // @ts-ignore
           document.getElementById("notifiDkCF1").style.display="block";
           // @ts-ignore
           document.getElementById("notifiDkCF2").style.display="none";
         }else {
           // @ts-ignore
           document.getElementById("notifiDkCF1").style.display="none";
           // @ts-ignore
           document.getElementById("notifiDkCF2").style.display="block";
         }
    })
  }
  getImgTransWallet(id:number){
    this.idTransWallet =id;
    this.adminService.getTransWalletById(id).subscribe((data)=>{
      this.transWalletById=data;
      this.imgTransWallet=this.transWalletById.imgTransaction;
    })
  }
  vdICodeViConfirm():boolean{
      if(this.viAdmin.passwordVi===this.passViCFValue){
          // @ts-ignore
        document.getElementById("codeViAdmin1").style.display="none";
        // @ts-ignore
        document.getElementById("codeViAdmin2").style.display="block";
        return true;
      }
      else {
        // @ts-ignore
        document.getElementById("codeViAdmin1").style.display="block";
        // @ts-ignore
        document.getElementById("codeViAdmin2").style.display="none";
        return false;
      }
  }
  transWalletDetal(id:number){
    this.adminService.getTransWalletById(id).subscribe((data)=>{
      this.transWalletById=data;
    })
  }
  confirmTransWallet(){
    let id = this.idTransWallet;
    // @ts-ignore
    let check = document.getElementById("checkBOX1").checked;
       if(this.vdICodeViConfirm()){
         this.adminService.getTransWalletById(id).subscribe((data)=>{
             this.transWalletById=data;
             if(this.viAdmin.numberMoneyVi>this.transWalletById.numberMoney){
                if(check){
                  this.funcitonAleartConfirmMoneyEnter();
                  this.adminService.confirmTransWallet(id).subscribe(()=>{
                    this.getViAdmin();
                    this.getTotalMoneyTransDateNow();
                    this.transWalletAll();
                    this.passViCFValue="";
                  })
                }
                else {
                    alert("Vui lòng xác thực bạn đã xem hóa đơn !")
                }
             }
             else {
               alert("Tài khoản của bạn không đủ tiền để xác thực giao dịch này !");
               this.passViCFValue="";
               // @ts-ignore
               document.getElementById("codeViAdmin1").style.display="none";
               // @ts-ignore
               document.getElementById("codeViAdmin2").style.display="none";
             }
         })

       }
       else {
         alert("Mã vi không hợp lệ !");
       }
  }
//   Nạp vi tiền cho amdin
  validateFormWallet():boolean{
        if(this.viAdmin.passwordVi===this.walletForm.value.passViAdmin){
          // @ts-ignore
          document.getElementById("codeViAdmin4").style.display="block"
          // @ts-ignore
          document.getElementById("codeViAdmin3").style.display="none";
          return true;
        }else {
          // @ts-ignore
          document.getElementById("codeViAdmin3").style.display="block";
          // @ts-ignore
          document.getElementById("codeViAdmin4").style.display="none"
          return  false;
        }
  }
  rechargeWalletAdmin(){
     if(this.walletForm.valid){
       // @ts-ignore
       let checked = document.getElementById("checkBOX").checked;
         if(this.validateFormWallet()){
           if(checked){
             this.adminService.walletAdmin(this.walletForm.value).subscribe((data)=>{
               alert("Nạp tiền thanh công")
               // @ts-ignore
               document.getElementById("codeViAdmin3").style.display="none";
               // @ts-ignore
               document.getElementById("codeViAdmin4").style.display="none"

               this.getViAdmin();
               this.walletForm = new FormGroup({
                 passViAdmin: new FormControl("", Validators.required),
                 numberMoney: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+"),Validators.min(5)]),
               })
             })
           }else {
             alert("Vui lòng đồng ý với mọi thỏa thuận !")
           }
         }else {
           alert("Kiểm tra lại form !")
         }
     }else {
       alert("Form không hợp lệ !")
     }
  }
  getAllTransWalletHr(){
      this.adminService.getAllTransWalletHr().subscribe((data)=>{
        this.transWalletHrAll=data;
      })
  }
  getAllTransWalletHrDateNow(){
      this.adminService.getAllTransWalletHrDateNow().subscribe((data)=>{
        this.transWalletHrAllDateNow=data;
        this.dateNow= this.transWalletHrAllDateNow[0]?.dateTrans;
      })
  }
  getTotalMoneyTransDateNow(){
    this.adminService.totalMoneyTransDateNow().subscribe((data)=>{
      this.totalMoneyTransDateNow=data;
      })
  }
  funcitonAleartConfirmMoneyEnter(){
     // @ts-ignore
    document.getElementById("modalConfirmWallet").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmWallet").style.display="none";
    },3000)
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"])
  }
}
