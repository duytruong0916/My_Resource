import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms' ;
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import {MyOwnCustomMaterialModule} from './SharedModules.module';

import {ValidateService} from './Services/validate.service';
import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NarbarComponent} from './Navbar/narbar.component';
import {LoginComponent} from './account/Login/login.component';
import {HomeComponent} from './Home/home.component';
import { RegisterComponent } from './account/Register/register.component';
import { PagenotfoundComponent } from './Pagenotfound/pagenotfound/pagenotfound.component';
import {AuthService} from './Services/auth.service';
import { ProfileComponent } from './account/Profile/profile.component';
import {AuthGuard} from './Guard/auth.guard';
import {ProductService} from './Services/product.service';
import {RegistersecondphaseComponent } from './account/registersecondphase/registersecondphase.component';
import {FighterComponent} from "./products/fighter/fighter.component";
import {CrowntailComponent} from "./products/crowntail/crowntail.component";
import {HalfmoonComponent} from "./products/halfmoon/halfmoon.component";
import { PlakatComponent } from "./products/plakat/plakat.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import { MainNavComponent } from './main-nav/main-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistersecondphaseComponent,
    NarbarComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ProfileComponent,
    CrowntailComponent,
    FighterComponent,
    HalfmoonComponent,
    FooterComponent,
    MainNavComponent,
    PlakatComponent
  ],
  imports: [
    MyOwnCustomMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ProductService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
