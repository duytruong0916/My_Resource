import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGaurd } from './auth/auth.guard';
const routes: Routes = [
  {path: 'sign-up', component:  SignUpComponent},
  {path: 'sign-in', component:  SignInComponent},
  {path: 'create-post', component: PostCreateComponent, canActivate: [AuthGaurd]},
  {path: 'view-post', component:  PostListComponent, canActivate: [AuthGaurd]},
  {path: 'edit-post/:postid', component:  PostCreateComponent, canActivate: [AuthGaurd]},
  {path: '',redirectTo: '/sign-in',pathMatch: 'full' },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
