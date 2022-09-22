import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AllService} from "../../services/all.service";
import {LoginService} from "../../services/login/login.service";
import {async, finalize, Observable} from "rxjs";
import {Field} from "../../model/Field";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {CvUser} from "../../model/CvUser";
import {doc} from "@angular/fire/firestore";
import {UserApply} from "../../model/UserApply";
import {UserToken} from "../../model/UserToken";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // fields!: Field[];
  indexPagination: number = 1;
  totalPagination!: number;
  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  fields!:Field[];
  idJobApply!:number;
  page:number=1;
  constructor(private router: Router, private userService: UserService, private storage: AngularFireStorage, private loginService: LoginService, private allService: AllService) {
  }
  postEnterpriseDetail!: PostEnterprise;
  postEnterpriseOffer!: PostEnterprise[];
  cvByUser!: CvUser;
  cvByIdAppUserAndIdPost!:UserApply;
  userLogin!:UserToken;
  ngOnInit(): void {
    this.loginService.findAllField().subscribe((data) => {
      this.fields = data;
    })
    this.listPostByOderPriority();
    this.findCvByIdUser();
    this.deletePostExpired()
    let pageChange = document.getElementsByClassName("pageChange");
    // @ts-ignore
    pageChange[this.page-1].style.background="#FF4F57";
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
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
    this.listPostByOderPriority();
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
    this.listPostByOderPriority();
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
    this.listPostByOderPriority();

  }
  listPostByOderPriority() {
    return this.userService.listPostByOderPriority(this.loginService.getUserToken().id,this.page).subscribe((data) => {
      this.postEnterpriseOffer = data;
    })
  }


  saveCvForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern("[A-Za-z]+")]),
    telephone: new FormControl("", [Validators.required, Validators.pattern("^0[0-9]+")]),
    mail: new FormControl("", [Validators.required , Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
    imgCV: new FormControl()
  })

  saveCV() {
    let idLogin = this.loginService.getUserToken().id;
    this.userService.findCvByIdUser(idLogin).subscribe((data)=>{
      if(data!=null){
        if(this.saveCvForm.valid){
          this.saveChangeCV(idLogin);
        }
        else {
          alert("Lỗi form")
        }
      }else {
        if(this.saveCvForm.valid){
          this.saveCvNew(idLogin);
          this.functionAleartConfirmSaveCv();
        }
        else {
          alert("Lỗi form")
        }
      }
  })
}
  saveCvNew(idLogin:number){
    this.saveCvForm.get("imgCV")?.setValue(this.fb);
    if (this.saveCvForm.value.imgCV === "") {
      alert("Vui lòng upload Cv")
    } else {
      let cvFormValue = this.saveCvForm.value;
      let Cv = {
        name: cvFormValue.name,
        telephone: cvFormValue.telephone,
        mail: cvFormValue.mail,
        imgCV: cvFormValue.imgCV,
        appUser: {
          id: idLogin
        }
      }
      this.userService.saveCv(Cv).subscribe(() => {
        // @ts-ignore
        document.getElementById('saveChangeCV').style.display = "block";
        // @ts-ignore
        document.getElementById('confirmCv').style.display = "none";
      })
    }
  }
  saveChangeCV(idLogin:number) {
    this.saveCvForm.get("imgCV")?.setValue(this.fb);
    if (this.saveCvForm.value.imgCV === "") {
      alert("Vui lòng  upload Cv")
    } else {
      let cv = this.saveCvForm.value;
      let Cv = {
        id: this.cvByUser.id,
        name: cv.name,
        telephone: cv.telephone,
        mail: cv.mail,
        imgCV: cv.imgCV,
        appUser: {
          id: idLogin
        }
      }
      this.userService.saveCv(Cv).subscribe(() => {

        this.findCvByIdUser();
      })
    }
  }
  postDetail(id: number) {
    this.userService.postDetail(id).subscribe((data) => {
      this.postEnterpriseDetail = data;
    })
  }

  findCvByIdUser() {
    let id = this.loginService.getUserToken().id;
    this.userService.findCvByIdUser(id).subscribe((data) => {
      if (data != null) {
        this.cvByUser = data;
        this.fb = this.cvByUser.imgCV;
        this.saveCvForm.get("name")?.setValue(this.cvByUser.name);
        this.saveCvForm.get("telephone")?.setValue(this.cvByUser.telephone);
        this.saveCvForm.get("mail")?.setValue(this.cvByUser.mail);
        // @ts-ignore
        document.getElementById('saveChangeCV').style.display = "block";
        // @ts-ignore
        document.getElementById('confirmCv').style.display = "none";
      }
    })
  }
  setIdJobApply(id:number){
    this.idJobApply =id;
  }
  saveApply(){
    let idLogin = this.loginService.getUserToken().id;
       let jobApply={
         appUser:{
           id: idLogin,
         },
         postEnterprise:{
           idPostEnterprise:this.idJobApply,
         }
       }
       this.userService.saveApplyJob(jobApply).subscribe(()=>{
         this.funcitonAleartConfirmApply();
         this.listPostByOderPriority();
         // this.findCvByIdUser();
       })
  }
  funcitonAleartConfirmApply(){
    // @ts-ignore
    document.getElementById("loading").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("loading").style.display="none";
      // @ts-ignore
      document.getElementById("modalConfirmApply").style.display="block";
      setTimeout(function (){
        // @ts-ignore
        document.getElementById("modalConfirmApply").style.display="none";

      },3500);
    },4000)

  }
  confirmSaveApplyJob(){
    let idPost = this.idJobApply;
    let idLogin = this.loginService.getUserToken().id;
    this.userService.findCvByIdUser(idLogin).subscribe((data)=>{
      if(data!=null){
        this.userService.findUserApplyByIdAppUserAndIdPost(idLogin,idPost).subscribe((data)=>{
          this.cvByIdAppUserAndIdPost = data;
          if(this.cvByIdAppUserAndIdPost===null){
            this.saveApply();
          }else {
            alert("Với CV ĐANG CÓ BẠN ĐÃ APPLY CÔNG VIỆC NÀY XIN THAY ĐỔI CV");
          }
        })
      }else {
              this.functionAleatConfirmNotCV()
      }
    })
  }
  searchForm=new FormGroup({
    nameEnterprise: new FormControl(""),
    city: new FormControl(""),
    idField: new FormControl(""),
  })
  search(){
    let search=this.searchForm.value;
    let searchform = {
      nameEnterprise: search.nameEnterprise,
      city: search.city,
      idField: search.idField,
      }
      if(this.searchForm.value.city=="" && this.searchForm.value.idField=="" && this.searchForm.value.nameEnterprise==""){
        location.reload();
      }
    if (this.searchForm.value.idField==""){
      this.loginService.findPostByUserField(searchform).subscribe((data) => {
        this.postEnterpriseOffer = data;
        if(this.postEnterpriseOffer.length===0){
          // @ts-ignore
          document.getElementById('NOData').style.display = "block";
        }else {
          // @ts-ignore
          document.getElementById('NOData').style.display = "none";
        }
      })
    }else {
      this.loginService.findPostByUser(searchform).subscribe((data) => {
        this.postEnterpriseOffer = data;
        if(this.postEnterpriseOffer.length===0){
          // @ts-ignore
          document.getElementById('NOData').style.display = "block";
        }else {
          // @ts-ignore
          document.getElementById('NOData').style.display = "none";
        }
      })
    }

  }
  deltalComponent(){
       this.router.navigate(["/user/deltal"])
  }
  //  XÓA BÀI ĐĂNG khi hết hạn
  deletePostExpired(){
    this.userService.deletePostExpired().subscribe(()=>{
    })
  }
  indexPaginationChage(value: any) {
    // this.indexPagination = value;
    console.log("value")
    console.log("value")
    console.log(value)
  }
  functionAleartConfirmSaveCv(){
    // @ts-ignore
    document.getElementById("modalConfirmSaveCV").style.display="block";
      setTimeout(function (){
        // @ts-ignore
        document.getElementById("modalConfirmSaveCV").style.display="none";
        // @ts-ignore
      },3000)
  }
  functionAleatConfirmNotCV(){
    // @ts-ignore
    document.getElementById("modalConfirmNotifiNotCv").style.display="block";
    setTimeout(function (){
      // @ts-ignore
      document.getElementById("modalConfirmNotifiNotCv").style.display="none";
      // @ts-ignore
    },3000)
  }

}

