import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{saveAs}  from 'file-saver'
@Component({
  selector: 'app-halfmoon',
  templateUrl: './halfmoon.component.html',
  styleUrls: ['./halfmoon.component.css']
})
export class HalfmoonComponent implements OnInit {
public imgUrl:any;
public selectedFile: File = null;
  constructor(private productservice: ProductService,
              private http: HttpClient) { }
  ngOnInit() {}

onfileselected(event){
  console.log(event);
  this.selectedFile = event.target.files.item(0);
  console.log(this.selectedFile);

  const reader = new FileReader;
  reader.onload =(e:any)=> this.imgUrl = e.target.result;
  reader.readAsDataURL(event.target.files.item(0));
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
getFile(){
  this.productservice.getHalfmoonInfo().subscribe(data=>{
  //const reader = new FileReader();
  //reader.onload = (e:any)=>{this.imgUrl = e.target.result};
  //reader.readAsDataURL(data.product[1].productImage);
  })
}
}
