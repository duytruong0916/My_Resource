import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';


const routes: Routes = [
  {path: 'create-post', component: PostCreateComponent},
  {path: 'view-post', component:  PostListComponent},
  {path: 'edit-post/:postid', component:  PostCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
