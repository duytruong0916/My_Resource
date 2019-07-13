import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }


getHalfmoonInfo(): Observable<any[]>{
  return this.http.get<any[]>('http://localhost:3000/api/halfmoonInfo', {headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
})}

postHalfmoonInfo(formdata):Observable<any[]>{
  return this.http.post<any>('http://localhost:3000/api/halfmoonInfo', formdata)
}

}
