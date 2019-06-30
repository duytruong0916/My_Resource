import {Injectable } from '@angular/core';
import {AuthService} from  '../Services/auth.service';
import {Router, CanActivate} from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthService,
                 private router: Router) { }
canActivate()
{
    if(this.authservice.isLoggedIn())
    {
        console.log(this.authservice.isLoggedIn())
        return true;
    }else
    {
        this.router.navigate(['/login']);
        return false;
    }
}

}