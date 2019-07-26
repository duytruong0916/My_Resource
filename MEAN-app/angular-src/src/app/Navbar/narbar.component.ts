import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  @Input() event;
  optionImage;
  option;
  public interval;
  public menuClass = {
    "d-none": true,
    "d-flex": false
  }
  constructor(private authservice: AuthService,
    private router: Router,
    private flashmessage: FlashMessagesService,
  ) { }
  enterMenuHandler(element) {
    this.option=element;
    switch (element) {
      case "plakat":
        this.optionImage = "assets/images/type3.png";
        break
      case "halfmoon":
        this.optionImage = "assets/images/type2.png";
        break;
      case "crowntail":
        this.optionImage = "assets/images/type1.png";
        break;
      case "fighter":
        this.optionImage = "assets/images/type3.png";
         break;

    }
    this.isMenuLook();
  }
  leaveMenuHandler() {
    this.interval = setInterval(() => {
      this.isdone();
    }, 1000)
  }
  isMenuLook() {
    clearInterval(this.interval)
    this.menuClass = {
      "d-none": false,
      "d-flex": true
    }
  }
  isdone() {
    this.menuClass = {
      "d-none": true,
      "d-flex": false
    }
  }
  onlogOut() {
    this.authservice.logOut();
    this.flashmessage.show('You are logged out', { cssClass: 'alert-success', timeout: 2000 });
    this.router.navigate(['/login']);
    return false;

  }
  ngOnInit() { }

}
