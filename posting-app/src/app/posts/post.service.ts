import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  public isLoading= false;
  private updatedPosts = new Subject<Post[]>();
  private posts: Post[] = [];
  constructor(private http: HttpClient,
              private router: Router) { }
  getPost() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/post')
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
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
    return this.http.get<{ message: string, post:any}>(`http://localhost:3000/api/post${postid}`, {params:params})
  }
  getupdatedPostListener() {
    return this.updatedPosts.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    }
    this.http.post<{ message: string, success: boolean, postid:any}>('http://localhost:3000/api/post', post)
    .subscribe(response=>{
      console.log(response);
      post.id = response.postid;
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/'])
    })
  }
  deletePost(id:string){
    const params = new HttpParams();
    params.append('id', id);
    this.http.delete<{ message: string, success: boolean}>(`http://localhost:3000/api/post/delete${id}`, {params:params})
    .subscribe(response=>{
      const postsAfterDeleted = this.posts.filter(post => post.id!==id);
      this.posts = postsAfterDeleted;
      this.updatedPosts.next([...this.posts]);
    })
  }
  updatePost(id:string, title:string, content:string){
    const params = new HttpParams();
    params.append('id', id);
    const post: Post = {id:id, title:title, content:content}
    this.http.put<{ message: string}>(`http://localhost:3000/api/post/update${id}`,post, {params:params})
    .subscribe(response=>{
      console.log(response.message);
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p=>p.id===post.id);
      updatedPosts[oldPostIndex]= post;
      this.posts = updatedPosts;
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/'])
    })
  }
}
