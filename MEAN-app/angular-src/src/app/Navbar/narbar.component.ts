import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../Services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {

  constructor(private authservice: AuthService,
              private router: Router,
              private flashmessage: FlashMessagesService) { }


  onlogOut(){
    this.authservice.logOut();
    this.flashmessage.show('You are logged out', {cssClass: 'alert-success', timeout: 2000});
    this.router.navigate(['/login']);
    return false;

  }
  ngOnInit() {
  }

}
