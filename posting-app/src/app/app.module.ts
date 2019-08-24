import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PostsModule } from './posts/posts.module';
//import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PostService } from './posts/post.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HeaderInterceptor } from './auth/auth-intercept';
import { AuthService } from './auth/auth.service';
import { ImageService } from './posts/image.service';
import { SharedModule } from './shareModules.mudule';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagenotfoundComponent,
  ],
  imports: [
    //AuthModule,
    PostsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [PostService,ImageService ,AuthService,{provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
