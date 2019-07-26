import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../Services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName
} from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  isFirstnameFilled: boolean;
  isLastnameFilled: boolean;
  isEmailFilled: boolean;
  form_1: FormGroup;
  form_2: FormGroup;
  isinvalidlogininfo = false;
  isMissingField;
  isInvalidEmail;

  usernameforfetch: String;
  ngOnInit() {
    this.form_1 = new FormGroup({
      'email': new FormControl(null,{validators:[Validators.required, Validators.email]}),
      'password': new FormControl(null, { validators: [Validators.required] })
    });
    this.form_2 = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });
  }
  constructor(
    private validateService: ValidateService,
    private flashmessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}
  onSubmitHandler() {
    this.isMissingField = false;
    this.isInvalidEmail = false;
    if (this.form_2.invalid) {
      if (
        this.form_2.value.email == null ||
        this.form_2.value.email == undefined
      ) {
        this.isEmailFilled = false;
        console.log(this.isEmailFilled);
      }
      if (
        this.form_2.value.firstname == null ||
        this.form_2.value.firstname == undefined
      ) {
        this.isFirstnameFilled = false;
        console.log(this.isFirstnameFilled);
      }
      if (
        this.form_2.value.lastname == null ||
        this.form_2.value.lastname == undefined
      ) {
        this.isLastnameFilled = false;
      }
      this.isMissingField = true;
      return false;
    } else if (!this.validateService.validateEmail(this.form_2.value.email)) {
      this.isInvalidEmail = true;
      return false;
    } else {
      this.authService.user = this.form_2.value;
      this.authService.AddUser(this.authService.user).subscribe(response=>{

      })
      this.router.navigate(["account"]);
      return true;
    }
  }
  onloginHandler() {
    let user = {
      email: this.form_1.value.email,
      password: this.form_1.value.password
    };
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.isinvalidlogininfo = false;
        this.authService.storeUserData(data.token, data.user);
        console.log("valid");
      } else {
        console.log("invalid");
        this.isinvalidlogininfo = true;
        this.flashmessage.show("Invalid email or password", {
          cssClass: "alert-danger",
          timeout: 2000
        });
        this.router.navigate(["register"]);
      }
    });
  }
  onchangehandler() {
    if (
      this.form_2.value.firstname != null ||
      this.form_2.value.firstname != undefined
    ) {
      this.isFirstnameFilled = true;
    }
    if (
      this.form_2.value.lastname != null ||
      this.form_2.value.lastname != undefined
    ) {
      this.isLastnameFilled = true;
    }
    if (
      this.form_2.value.email != null ||
      this.form_2.value.email != undefined
    ) {
      this.isEmailFilled = true;
    }
    if (this.validateService.validateEmail(this.form_2.value.email)) {
      this.isInvalidEmail = false;
    }
  }
  fetchUser() {
    console.log(this.usernameforfetch);
    this.authService.getUser(this.usernameforfetch).subscribe(data => {
      console.log(data);
    });
  }
}
