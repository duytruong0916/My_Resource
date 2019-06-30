import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../Services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../Services/auth.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname:String;
  lastname:String;
  username:String;
  password:String;
  address:String;
  email:String;
  phone:Number;
  usernameforfetch:String;
  constructor(private validateService: ValidateService,
              private flashmessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) {}

  onsubmitHandler(){
    const user = {
      lastname: this.lastname,
      firstname: this.firstname,
      username:this.username,
      password: this.password,
      address: this.address,
      email: this.email,
      phone: this.phone
    }
    if(!this.validateService.validateRegister(user))
    {
      this.flashmessage.show('Missing information.', { cssClass: 'alert-danger', timeout: 1000 } )
      return false;
    }
    if(!this.validateService.validateEmail(user.email))
    {
      this.flashmessage.show('Invalid email.', { cssClass: 'alert-danger', timeout: 2000 })
      return false;
    }

    this.authService.AddUser(user).subscribe(data =>{
      this.flashmessage.show('You are now registered and can log in', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['/login']);
    });
  }

  fetchUser(){
    console.log(this.usernameforfetch);
    this.authService.getUser(this.usernameforfetch).subscribe(data =>{
      console.log(data);
    })
 
  }
  ngOnInit() {
  }

}
