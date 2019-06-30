import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../Services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

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
           this.flashmessage.show(`Hello ${this.username}! You are signed in`, {cssClass: 'alert-success', timeout: 4000 });
         }
         else {
           this.flashmessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000 });
           this.router.navigate(['login']);
         }

    })
  }
  ngOnInit() {
  }

}
