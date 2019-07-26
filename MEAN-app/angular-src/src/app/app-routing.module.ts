import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegistersecondphaseComponent} from "./account/registersecondphase/registersecondphase.component";
import {FighterComponent} from './products/fighter/fighter.component';
import {CrowntailComponent} from "./products/crowntail/crowntail.component";
import {HalfmoonComponent} from "./products/halfmoon/halfmoon.component";
import { PlakatComponent } from './products/plakat/plakat.component';
import { LoginComponent } from './account/Login/login.component';
import { HomeComponent } from './Home/home.component';
import { RegisterComponent } from './account/Register/register.component';
import { PagenotfoundComponent } from './Pagenotfound/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './account/Profile/profile.component';
import {AuthGuard} from './Guard/auth.guard';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'account', component: RegistersecondphaseComponent},
  {path: 'halfmoon', component: HalfmoonComponent },
  {path: 'crowntail', component: CrowntailComponent },
  {path: 'fighter', component: FighterComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
