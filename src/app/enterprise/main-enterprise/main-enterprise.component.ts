import {Component, OnInit} from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Enterprise} from "../../model/Enterprise";
import {LoginService} from "../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize, min, Observable} from "rxjs";
import {FormJob} from "../../model/FormJob";
import {Regime} from "../../model/Regime";
import {Field} from "../../model/Field";
import {PostEnterprise} from "../../model/PostEnterprise";
import {Router} from "@angular/router";
import {NotiEnter} from "../../model/NotiEnter";
import {UserApply} from "../../model/UserApply";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {TransWalletHr} from "../../model/TransWalletHr";

@Component({
  selector: 'app-table-enterprise',
  templateUrl: './main-enterprise.component.html',
  styleUrls: ['./main-enterprise.component.css']
})
export class MainEnterpriseComponent implements OnInit {
 p:any;
  enterpriseLogin!: Enterprise;
  listFormJob!: FormJob[];
  listRegime!: Regime[];
  listField!: Field[];
  listPostByIdEnterprise!:PostEnterprise[];
  postEnterpriseKey!: PostEnterprise;
  postEdit!:PostEnterprise;
  imgEdit!:string
  editProfileEnterPrise!:Enterprise;
  profileForm!:any;
  fb: string = "";
  notifiApplyFromUser!: NotiEnter[];
  idConfirmNotifi!:number;
  transWalletHrByIdEnters!:TransWalletHr[];
  listUserApplyByIdPost!:UserApply[];
  userApplyById!:UserApply;
  imgCvByIdUserApply!:string;
  title = "cloudsSorage";
  downloadURL: Observable<string> | undefined;
  constructor(private router:Router,private storage: AngularFireStorage, private enterpriseService: EnterpriseService, private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.enterpriseLoginFunction();
    this.enterpriseService.findAllFormJob().subscribe((data) => {
      this.listFormJob = data;
      console.log("find all form job")
      console.log(data)
    })
    this.enterpriseService.findAllRegime().subscribe((data) => {
      this.listRegime = data;
      console.log("find all regime")
      console.log(data)
    })
    this.loginService.findAllField().subscribe((data) => {
      this.listField = data;
      console.log("fimd all field")
      console.log(data)
    })
    this.deletePostExpired();
  }
  onFileSelected({event}: { event: any }) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  walletForm = new FormGroup({
    codeVi: new FormControl("", Validators.required),
    viEnterprise: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+"),Validators.min(5)]),
    imgTransWallet:new FormControl(),
  })
  changeCodeViForm = new FormGroup({
    codeViOld: new FormControl("", Validators.required),
    codeViNew: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
    codeViNewAgain: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
  })

  createPostForm = new FormGroup({
        namePostEnterprise: new FormControl("", Validators.required),
        addressMainEnterprise: new FormControl("", Validators.required),
        idField: new FormControl(),
        idFormJob: new FormControl(),
        idRegime: new FormControl(),
        salarySmallPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
        salaryBigPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
        vacanciesPostEnterprise: new FormControl("", Validators.required),
        expirationDatePostEnterprise: new FormControl("", Validators.required),
        describePostEnterprise: new FormControl("", Validators.required),
      })
  setStatusEnterpriseTo1() {
    this.enterpriseService.setStatusEnterpriseTo1(this.enterpriseLogin.idEnterprise).subscribe(() => {
    })
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  enterpriseLoginFunction(): void {
    let username = this.loginService.getUserToken().username;
    this.enterpriseService.findEnterpriseByName(username).subscribe((data) => {
      console.log(data);
      this.enterpriseLogin = data;
      console.log(this.enterpriseLogin.statusEnterprise);
      this.getAllPostByEnterprise();
      this.notifiFromUserApply();

    })

  }
  getAllPostByEnterprise(){
    this.enterpriseService.findAllByIdEnterprise(this.enterpriseLogin.idEnterprise).subscribe((data)=>{
      this.listPostByIdEnterprise=data;
    })
  }

  inputCodeViWalletForm() {
    if (this.walletForm.value.codeVi !== this.enterpriseLogin.codeViEnterprise) {
      // @ts-ignore
      document.getElementById('codeVi1').style.display = "block";
      // @ts-ignore
      document.getElementById('codeVi2').style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById('codeVi1').style.display = "none";
      // @ts-ignore
      document.getElementById('codeVi2').style.display = "block";
    }
  }
  createPost() {
    if (this.createPostForm.valid) {
      this.functionAleartCreatePost();
      let createPostForm = this.createPostForm.value;
      let postEnterprise = {
        namePostEnterprise: createPostForm.namePostEnterprise,
        addressMainEnterprise: createPostForm.addressMainEnterprise,
        field: {
          idField: createPostForm.idField
        },
        regime: {
          idRegime: createPostForm.idRegime
        },
        formJobPostEnterprise: {
          idFormJob: createPostForm.idFormJob
        },
        salarySmallPostEnterprise: createPostForm.salarySmallPostEnterprise,
        salaryBigPostEnterprise: createPostForm.salaryBigPostEnterprise,
        vacanciesPostEnterprise: createPostForm.vacanciesPostEnterprise,
        expirationDatePostEnterprise: createPostForm.expirationDatePostEnterprise,
        describePostEnterprise: createPostForm.describePostEnterprise,
        enterprise: {
          idEnterprise: this.enterpriseLogin.idEnterprise,
        }
      }
      this.enterpriseService.savePost(postEnterprise).subscribe(() => {
        this.enterpriseLoginFunction();
        this.createPostForm = new FormGroup({
          namePostEnterprise: new FormControl("", Validators.required),
          addressMainEnterprise: new FormControl("", Validators.required),
          idField: new FormControl(),
          idFormJob: new FormControl(),
          idRegime: new FormControl(),
          salarySmallPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
          salaryBigPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
          vacanciesPostEnterprise: new FormControl("", Validators.required),
          expirationDatePostEnterprise: new FormControl("", Validators.required),
          describePostEnterprise: new FormControl("", Validators.required),
        })
      })
    } else {
      alert("Form khong hop le !");
    }
  }
  confirmCreatePost() {
    if (this.enterpriseLogin.statusEnterprise) {
      if(this.enterpriseLogin.viEnterprise<5){
        alert("Tài khoản của bạn không đủ tiền để đăng bài mới vui lòng nạp thêm !")
      }
      else {
        if(this.validateExpirationDate()  && this.validatesalaryBigPostEnterprise()){
          this.createPost();
        }else {
          alert("Vui lòng kiểm tra lại form");
        }
    }
    }else {
      alert("Tài khoản của bạn đã bị khóa xin vui lòng liên hệ với admin !")
    }
  }
  rechargeWallet() {
    if(this.walletForm.valid){
      if (this.walletForm.value.codeVi === this.enterpriseLogin.codeViEnterprise) {
        this.walletForm.get("imgTransWallet")?.setValue(this.fb);
        if(this.walletForm.value.imgTransWallet===""){
          alert("Vui lòng đợi hóa đơn được upload !")
        }
        else {
          let id = this.enterpriseLogin.idEnterprise;
          let transWalletValue = this.walletForm.value;
          let transWalletOj ={
            enterprise:{
              idEnterprise:id,
            },
            numberMoney:transWalletValue.viEnterprise,
            imgTransaction:transWalletValue.imgTransWallet
          }
          this.enterpriseService.saveTransWallet(transWalletOj).subscribe(() => {
            this.funcitonAleartRechangeWallet();
            this.walletForm = new FormGroup({
              codeVi: new FormControl("", Validators.required),
              viEnterprise: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+")]),
              imgTransWallet:new FormControl(),
            })
            this.fb="";
            this.enterpriseLoginFunction();
          })
          // @ts-ignore
          document.getElementById('codeVi2').style.display = "none";
        }
      } else {
        alert("Mã ví không hợp lệ!")
      }
    }else {
      alert("Dữ liệu form không hợp lệ !")
    }

  }
  changeCodeVi() {
      if(this.changeCodeViForm.valid){
        let id = this.enterpriseLogin.idEnterprise;
        if (this.changeCodeViForm.value.codeViNewAgain === this.changeCodeViForm.value.codeViNew && this.changeCodeViForm.value.codeViOld === this.enterpriseLogin.codeViEnterprise) {
          this.enterpriseService.changeCodeVi(id, String(this.changeCodeViForm.value.codeViNew)).subscribe(() => {
            // @ts-ignore
            document.getElementById("codeVi4").style.display="none";
            // @ts-ignore
            document.getElementById("codeViNewAgain2").style.display="none";
            this.funcitonAleartChangeCodeVi();
             this.changeCodeViForm = new FormGroup({
              codeViOld: new FormControl("", Validators.required),
              codeViNew: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
              codeViNewAgain: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
            })
            this.enterpriseLoginFunction();
          })
        } else {
          alert("Vui lòng kiểm tra lại có gì đó chưa đúng!")
        }
      }
      else {
        alert("Dữ liệu form không hợp lệ !")
      }
  }

  // Validate các forrm

  validatesalaryBigPostEnterprise():boolean{
      if(Number(this.createPostForm.value.salarySmallPostEnterprise)>=Number(this.createPostForm.value.salaryBigPostEnterprise)){
        // @ts-ignore
        document.getElementById("validateSalary").style.display="block";
        return false;
      }
      else {
        // @ts-ignore
        document.getElementById("validateSalary").style.display="none";
        return true;
      }
  }
  validateInputCodeViChangeCodeViForm() {
    if (this.changeCodeViForm.value.codeViOld !== this.enterpriseLogin.codeViEnterprise) {
      // @ts-ignore
      document.getElementById("codeVi3").style.display = "block";
      // @ts-ignore
      document.getElementById('codeVi4').style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById('codeVi3').style.display = "none";
      // @ts-ignore
      document.getElementById('codeVi4').style.display = "block";
    }
  }
  validateExpirationDate() {
    let dateNow = new Date();
    let date = "'" + this.createPostForm.value.expirationDatePostEnterprise + "'";
    let dateExpirationDate = new Date(date);
    if (dateExpirationDate > dateNow) {
      // @ts-ignore
      document.getElementById("expirationDate").style.display = "none";
      return true;
    } else {
      // @ts-ignore
      document.getElementById("expirationDate").style.display = "block";
      return false;
    }
  }
  validateCodeViAgain() {
    if (this.changeCodeViForm.value.codeViNewAgain === this.changeCodeViForm.value.codeViNew) {
      // @ts-ignore
      document.getElementById("codeViNewAgain2").style.display = "block";

      // @ts-ignore
      document.getElementById("codeViNewAgain1").style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById("codeViNewAgain2").style.display = "none";

      // @ts-ignore
      document.getElementById("codeViNewAgain1").style.display = "block";
    }
  }
  editStatus(id: number){
    this.enterpriseService.findPostById(id).subscribe((data)=>{
        this.postEnterpriseKey =data;
        if(!this.postEnterpriseKey.statusPostEnterprise){
             this.enterpriseService.openKeyPost(id).subscribe(()=>{
               alert("Mở khóa thành công !")
               this.getAllPostByEnterprise();
             })
        }else {
          this.enterpriseService.statusPost(id).subscribe(()=>{
            alert("Khóa thành công !")
            this.getAllPostByEnterprise();
          })
        }
    })
  }
  //edit bài post
  editPost(id:number){
    this.enterpriseService.findPostById(id).subscribe((data)=>{
      this.postEdit=data;
      this.editPostForm.get("namePostEnterpriseEdit")?.setValue(this.postEdit.namePostEnterprise);
      this.editPostForm.get("addressMainEnterpriseEdit")?.setValue(this.postEdit.addressMainEnterprise);
      this.editPostForm.get("salarySmallPostEnterpriseEdit")?.setValue(Number(this.postEdit.salarySmallPostEnterprise));
      this.editPostForm.get("salaryBigPostEnterpriseEdit")?.setValue(this.postEdit.salaryBigPostEnterprise);
      this.editPostForm.get("vacanciesPostEnterpriseEdit")?.setValue(this.postEdit.vacanciesPostEnterprise);
      this.editPostForm.get("expirationDatePostEnterpriseEdit")?.setValue(String(this.postEdit.expirationDatePostEnterprise));
      this.editPostForm.get("describePostEnterpriseEdit")?.setValue(this.postEdit.describePostEnterprise);
    })
  }
  editPostForm = new FormGroup({
    namePostEnterpriseEdit: new FormControl("", Validators.required),
    addressMainEnterpriseEdit: new FormControl("", Validators.required),
    idFieldEdit: new FormControl(),
    idFormJobEdit: new FormControl(),
    idRegimeEdit: new FormControl(),
    salarySmallPostEnterpriseEdit: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
    salaryBigPostEnterpriseEdit: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
    vacanciesPostEnterpriseEdit: new FormControl("", Validators.required),
    expirationDatePostEnterpriseEdit: new FormControl("", Validators.required),
    describePostEnterpriseEdit: new FormControl("", Validators.required),
  })

  editPostConfim(){
      if(this.editPostForm.valid){
        let editPostForm = this.editPostForm.value;
        let postEnterprise = {
          idPostEnterprise:this.postEdit.idPostEnterprise,
          namePostEnterprise: editPostForm.namePostEnterpriseEdit,
          addressMainEnterprise: editPostForm.addressMainEnterpriseEdit,
          field: {
            idField: editPostForm.idFieldEdit
          },
          regime: {
            idRegime: editPostForm.idRegimeEdit
          },
          formJobPostEnterprise: {
            idFormJob: editPostForm.idFormJobEdit
          },
          salarySmallPostEnterprise: editPostForm.salarySmallPostEnterpriseEdit,
          salaryBigPostEnterprise: editPostForm.salaryBigPostEnterpriseEdit,
          vacanciesPostEnterprise: editPostForm.vacanciesPostEnterpriseEdit,
          expirationDatePostEnterprise: editPostForm.expirationDatePostEnterpriseEdit,
          describePostEnterprise: editPostForm.describePostEnterpriseEdit,
          enterprise: {
            idEnterprise: this.enterpriseLogin.idEnterprise,
          }
        }
        this.enterpriseService.editPost(postEnterprise).subscribe(() => {
          alert("Chỉnh sửa bài viết  thành công!")
          this.getAllPostByEnterprise();
        })
      }else {
          alert("Xin vui lòng kiểm tra lại form !")
      }
    }

//    danh sách thông báo khi có ng apply
  notifiFromUserApply(){
      let idEnterprise = this.enterpriseLogin.idEnterprise;
      this.enterpriseService.listNorifiFromApplyUser(idEnterprise).subscribe((data)=>{
      this.notifiApplyFromUser = data;
      })
  }

  setIdConfirmNotifi(id: number){
    this.idConfirmNotifi = id;
  }
  confirmNotifi(){
    this.funcitonAleartConfirmUserCv();
    this.enterpriseService.confirmNotifi(this.idConfirmNotifi).subscribe(()=>{
         this.notifiFromUserApply();
       })
  }

  userApplyByIdPost(id:number){
    this.enterpriseService.allUserApplyByIdPost(id).subscribe((data)=>{
      this.listUserApplyByIdPost =data;
       })
  }

//  danh sach lich suw cua giao dich nap tien
  getTransWalletHrByIdEnter(){
      let idEnterpriseLogin = this.enterpriseLogin.idEnterprise;
      this.enterpriseService.getTransWalletHrByIdEnter(idEnterpriseLogin).subscribe((data)=>{
        this.transWalletHrByIdEnters=data;
      })

  }
//  XÓA BÀI ĐĂNG khi hết hạn
  deletePostExpired(){
    this.enterpriseService.deletePostExpired().subscribe(()=>{
    })
  }

//  tìm dối tượng userApply theo id;

  getUserApplyById(id:number){
      this.enterpriseService.getUserApplyById(id).subscribe((data)=>{
        this.userApplyById =data;
        this.imgCvByIdUserApply=this.userApplyById.imgCV;
        console.log(this.imgCvByIdUserApply);
        console.log(id)
      })
  }

  editProfile(){

    let id=this.enterpriseLogin.idEnterprise;
    this.enterpriseService.findEnterpriseById(id).subscribe((data)=>{
      this.editProfileEnterPrise=data;
      this.imgEdit= this.editProfileEnterPrise.imgEnterprise;
      this.formProfile.get("nameEnterprise")?.setValue(this.editProfileEnterPrise.nameEnterprise);
      this.formProfile.get("codeConfirmEnterprise")?.setValue(this.editProfileEnterPrise.codeConfirmEnterprise);
      this.formProfile.get("gmailEnterprise")?.setValue(this.editProfileEnterPrise.gmailEnterprise);
      this.formProfile.get("addressMainEnterprise")?.setValue(this.editProfileEnterPrise.addressMainEnterprise);
      // this.formProfile.get("fieldEnterprise")?.setValue(this.editProfileEnterPrise.fieldEnterprise);
      this.formProfile.get("describeEnterprise")?.setValue(this.editProfileEnterPrise.describeEnterprise);
      // this.formProfile.get("imgEnterprise")?.setValue(this.editProfileEnterPrise.imgEnterprise);
      // this.formProfile.get("mail")?.setValue(this.editProfileEnterPrise);
    })

  }
  formProfile = new FormGroup({
    // idEnterprise: new FormControl(0, Validators.required),
    nameEnterprise: new FormControl("", Validators.required),
    codeConfirmEnterprise: new FormControl("", Validators.required),
    gmailEnterprise: new FormControl("", Validators.required),
    // imgEnterprise: new FormControl("", Validators.required),
    addressMainEnterprise: new FormControl("", Validators.required),
    idField: new FormControl(),
    describeEnterprise: new FormControl("", Validators.required),
  })


  editProfileEnterprise() {
    let filed = this.formProfile.value;
    let filedNew = {
      idEnterprise:this.enterpriseLogin.idEnterprise,
      nameEnterprise: filed.nameEnterprise,
      codeConfirmEnterprise: filed.codeConfirmEnterprise,
      gmailEnterprise: filed.gmailEnterprise,
      // Chạy hàm upload ảnh và lấy ra link ảnh
      imgEnterprise: this.imgEdit,
      addressMainEnterprise: filed.addressMainEnterprise,
      describeEnterprise: filed.describeEnterprise,
      fieldEnterprise: {
        idField: filed.idField
      }
    }

    this.enterpriseService.editProfile(filedNew).subscribe(() => {
      alert("Lưu thay đổi thành công");
    })
  }
  funcitonAleartConfirmUserCv(){
    // @ts-ignore
    document.getElementById("modalConfirmUserCv").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmUserCv").style.display="none";
      // @ts-ignore
      document.getElementById("modalConfirmCvUser").style.display="block";
      setTimeout(function (){
        // @ts-ignore
        document.getElementById("modalConfirmCvUser").style.display="none";

      },3000);
    },3500)
  }
  funcitonAleartChangeCodeVi(){
    // @ts-ignore
    document.getElementById("modalConfirmChangeCodeVi").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmChangeCodeVi").style.display="none";

    },3000);
  }
  funcitonAleartRechangeWallet(){
    // @ts-ignore
    document.getElementById("modalConfirmRechargeWallet").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmRechargeWallet").style.display="none";

    },3000);
  }
  functionAleartCreatePost(){
    // @ts-ignore
    document.getElementById("modalConfirmCreatePost").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmCreatePost").style.display="none";

    },3000);
  }
}
