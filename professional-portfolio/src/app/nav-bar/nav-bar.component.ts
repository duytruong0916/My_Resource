import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  ishome:boolean = false;
  isclicked:boolean = false;
  selectid:string;
  constructor() { }

  ngOnInit() {
  }
  onClick(id){
    this.ishome = false;
    this.selectid = id;
  }

}
