import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../../Services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators, FormControlName} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;

  ngOnInit() {


  }

  constructor(private authservice: AuthService,
              private router: Router,
              private flashmessage: FlashMessagesService) {}

  loginHandler(){
    let user = {
      username: this.username,
      password: this.password
    }
    this.authservice.authenticateUser(user).subscribe(data=>{
         if(data.success)
         {
           this.authservice.storeUserData(data.token, data.user);
           console.log("true")
         }
         else {
           console.log(data.msg)
           this.router.navigate(['login']);
         }

    })
  }

}
