import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-halfmoon',
  templateUrl: './halfmoon.component.html',
  styleUrls: ['./halfmoon.component.css']
})
export class HalfmoonComponent implements OnInit {
selectedFile: File = null;
  constructor(private productservice: ProductService,
              private http: HttpClient) { }
  ngOnInit() {}


onfileselected(event){
  console.log(event);
  this.selectedFile = event.target.files.item(0);
}
onUpload()
{
  const formdata: FormData = new FormData();
  formdata.append('file', this.selectedFile);
  formdata.append('name', 'Paris 2019');
  this.productservice.postHalfmoonInfo(formdata).subscribe(response =>{
      console.log(response);
  })
}

}
