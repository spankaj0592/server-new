import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/Services/auth.service";
import { NotificationService } from "app/Services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submit: boolean = false;
  error;

  // errorMsgs = this.errorService.errorsMsgs
  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authservice: AuthService
    ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [, Validators.required]],
      password: ["", Validators.required],
    });
  }

  /**
   *
   * @param isValid
   * @param formValue
   * to save loginForm
   */
  get f() {
    return this.loginForm.controls;
  }
  save(isValid: any, formValue: any): void {
    console.log(`${isValid}, ${formValue}`);
    if (!isValid) {
      return;
    }
    this.submit = true;
    this.spinner.show();
    const formObj = {
      username: formValue.username,
      password: formValue.password,
    };
    console.log("loginForm value", formObj);
    this.loginService.postData(formObj).subscribe((res: any) => {
      console.log("response data", res);
    this.spinner.hide();
  
    localStorage.setItem('token',res.body.token);
    this.router.navigateByUrl('/dashboard');


      this.notification.showNotification("top", "right", "successfull", 2);
    });
  }
}
