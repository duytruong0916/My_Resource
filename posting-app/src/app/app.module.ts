import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './shareModules.mudule';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {PostService } from './posts/post.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HeaderInterceptor } from './auth/auth-intercept';
import { AuthService } from './auth/auth.service';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageService } from './posts/image.service';
@NgModule({
  declarations: [
    AppComponent,
     HeaderComponent,
    PostCreateComponent,
    PostListComponent,
    SignInComponent,
    SignUpComponent,
    PagenotfoundComponent,
  ],
  imports: [
    HttpClientModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2ImgMaxModule
  ],
  providers: [PostService,ImageService ,AuthService,{provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
