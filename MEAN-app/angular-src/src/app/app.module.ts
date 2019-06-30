import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms' ;
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import {ValidateService} from './Services/validate.service';
import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NarbarComponent} from './Navbar/narbar.component';
import {LoginComponent} from './Login/login.component';
import {HomeComponent} from './Home/home.component';
import { RegisterComponent } from './Register/register.component';
import { PagenotfoundComponent } from './Pagenotfound/pagenotfound/pagenotfound.component';
import {AuthService} from './Services/auth.service';
import { ProfileComponent } from './Profile/profile.component';
import {AuthGuard} from './Guard/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NarbarComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ProfileComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
