import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostService } from '../post.service';
import {Post } from '../post.model';
import {Subscription} from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
public userid:string;
private postSub: Subscription;
public isLoading =false;
public posts:Post[]=[];
  constructor(private postservice: PostService,
              private authservice :AuthService) { }

  onDelete(id:string)
  {
    this.postservice.deletePost(id);

  }
  ngOnInit() {
    this.isLoading =true;
    this.userid = this.authservice.getUserId();
    this.postservice.getPost();
    this.postSub = this.postservice.getupdatedPostListener().subscribe(posts=>{
      this.isLoading =false;
      this.posts = posts;
      this.userid = this.authservice.getUserId();
    })
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
