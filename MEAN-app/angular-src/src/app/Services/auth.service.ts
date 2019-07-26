import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {User} from "../account/user";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authtoken: string;
  user:User;
  constructor(private http: HttpClient) {
  }
  getUser(name): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/api/user/${name}`);
  }
  AddUser(user): Observable<any>{
      return this.http.post<any>('http://localhost:3000/api/user/register', user, {headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
  }
  authenticateUser(userinfo): Observable<{success: boolean, token: string, user: Object, msg: string}>{
    return this.http.post<{success: boolean, token: string, user: Object, msg: string}>('http://localhost:3000/api/user/authenticate', userinfo, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })})
  }
  getProfile(){
    this.loadToken();
    return this.http.get<any>('http://localhost:3000/api/user/profile', {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.authtoken}`
    })})
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authtoken = token;
    this.user = user;
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }
  logOut()
  {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }
 isLoggedIn(){
   if(this.authtoken == null)
      return false
    else
    return true;
 }
}
