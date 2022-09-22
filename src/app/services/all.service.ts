import { Injectable } from '@angular/core';
import {Field} from "../model/Field";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import * as url from "url";
import {Enterprise} from "../model/Enterprise";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AllService {
  fields!: Field[];
  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  constructor(private storage: AngularFireStorage){}
  onFileSelected(event:any) {
    let str =""
    console.log("hello");
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`,file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              str = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
    // console.log(url);
    return str;
  }
}
