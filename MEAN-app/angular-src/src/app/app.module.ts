import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms' ;
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import {MyOwnCustomMaterialModule} from './SharedModules.module';

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
import {ProductService} from './Services/product.service';
import { DragonComponent } from './products/dragon/dragon.component';
import { FancyComponent } from './products/fancy/fancy.component';
import { CrowntailComponent } from './products/crowntail/crowntail.component';
import { FighterComponent } from './products/fighter/fighter.component';
import { HalfmoonComponent } from './products/halfmoon/halfmoon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import { MainNavComponent } from './main-nav/main-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NarbarComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ProfileComponent,
    DragonComponent,
    FancyComponent,
    CrowntailComponent,
    FighterComponent,
    HalfmoonComponent,
    FooterComponent,
    MainNavComponent
  ],
  imports: [
    MyOwnCustomMaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ProductService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
