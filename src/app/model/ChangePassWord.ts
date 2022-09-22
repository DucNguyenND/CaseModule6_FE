import {FormControl, ɵValue} from "@angular/forms";

export class ChangePassWord{
  public gmail!:ɵValue<FormControl<string | null>> | undefined;
  public password!:ɵValue<FormControl<string | null>> | undefined;

  constructor(gmail: string, password: string) {
    this.gmail = gmail;
    this.password = password;
  }

}
