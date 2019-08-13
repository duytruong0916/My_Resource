import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import {environment} from "../../environments/environment.prod";
const Backend_URL = environment.apiURL+ '/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private updatedPosts = new Subject<Post[]>();
  private posts: Post[] = [];
  constructor(private http: HttpClient,
              private router: Router) { }
  getPost() {
    this.http.get<{ message: string, posts: any }>( Backend_URL)
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          }
        })
      }))
      .subscribe(posts => {
        console.log(posts);
        this.posts = posts;
        this.updatedPosts.next([...this.posts]);
      })
  }
  getPostID(postid:string){
    const params = new HttpParams();
    params.append('id', postid);
    return this.http.get<{ message: string, post:any}>( Backend_URL+ `${postid}`, {params:params})
  }
  getupdatedPostListener() {
    return this.updatedPosts.asObservable();
  }
  addPost(title: string, content: string, image:File ) {
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('image', image, title);
    this.http.post<{ message: string, success: boolean, post:any}>(Backend_URL, formdata)
    .subscribe(response=>{
      const post:Post = {
        id: response.post.id,
        title: response.post.title,
        content:response.post.content,
        imagePath: response.post.imagePath,
        creator:response.post.creator
      }
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/view-post'])
    })
  }
  deletePost(id:string){
    const params = new HttpParams();
    params.append('id', id);
    this.http.delete<{ message: string, success: boolean}>(Backend_URL+ `/delete${id}`, {params:params})
    .subscribe(response=>{
      const postsAfterDeleted = this.posts.filter(post => post.id!==id);
      this.posts = postsAfterDeleted;
      this.updatedPosts.next([...this.posts]);
    })
  }
  updatePost(id:string, title:string, content:string, image:File|string){
    let postdata:Post|FormData;
    if(typeof image==='object'){
      postdata = new FormData();
      postdata.append('id', id);
      postdata.append('title', title);
      postdata.append('content', content);
      postdata.append('image', image, title);
    }else{
      postdata = {id:id, title:title, content:content, imagePath: image, creator:null}
    }
    const params = new HttpParams();
    params.append('id', id);
    this.http.put<{ message: string, updatedpost: any}>(Backend_URL+ `/update${id}`,postdata, {params:params})
    .subscribe(response=>{
      console.log(response.message);
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p=>p.id===id);
      const post: Post = {id:id, title:title, content:content, imagePath: response.updatedpost.imagePath, creator:response.updatedpost.creator}
      updatedPosts[oldPostIndex]= post;
      this.posts = updatedPosts;
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/view-post'])
    })
  }
}
