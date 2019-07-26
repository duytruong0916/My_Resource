import { Component, OnInit } from '@angular/core';
import {Product} from  "../product";
  import { from } from 'rxjs';
@Component({
  selector: 'app-plakat',
  templateUrl: './plakat.component.html',
  styleUrls: ['./plakat.component.css']
})
export class PlakatComponent implements OnInit {
  plakat:Product[];


  constructor() { }

  ngOnInit() {
  }

}
