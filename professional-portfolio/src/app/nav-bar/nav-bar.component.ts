import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  ishome:boolean = false;
  istoggled:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleMenu(){
    this.istoggled = !this.istoggled;
  }

}
