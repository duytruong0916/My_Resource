import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { Post } from '../post.model'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public mode: string = 'create';
  public isLoading= false;
  public postid: string;
  public post:Post;
  public form: FormGroup;
  public enteredvalue;
  constructor(private postservice: PostService,
    private activateroute: ActivatedRoute) { }
  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading =true;
    if(this.mode == "create"){
      console.log(this.form.value)
      this.postservice.addPost(this.form.get('title').value, this.form.get('content').value);
    }
    else{
      console.log(this.form.value)
      this.postservice.updatePost(this.postid, this.form.get('title').value, this.form.get('content').value);
    }
    this.form.reset();
  }
  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
    })
    this.isLoading =true;
    this.activateroute.paramMap.subscribe((paramap) => {
      this.isLoading =false;
      if (paramap.has('postid')) {
        this.mode = "edit";
        this.postid = paramap.get('postid');
        this.postservice.getPostID(this.postid).subscribe(response=>{
          this.post = {id: response.post._id, title: response.post.title, content:response.post.content};
          this.form.setValue({title: this.post.title, content:this.post.content})
        })
      } else {
        this.mode = "create";
        this.postid = null;
      }
    })
  }

}
