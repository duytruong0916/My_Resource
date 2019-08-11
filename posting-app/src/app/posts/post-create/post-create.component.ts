import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { Post } from '../post.model'
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mine-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public imagePreview;
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
      this.postservice.addPost(this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    else{
      console.log(this.form.value)
      this.postservice.updatePost(this.postid, this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    this.form.reset();
  }
  onImageHandler(event){
    const file = event.target.files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }
  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    })
    this.isLoading =true;
    this.activateroute.paramMap.subscribe((paramap) => {
      this.isLoading =false;
      if (paramap.has('postid')) {
        this.mode = "edit";
        this.postid = paramap.get('postid');
        this.postservice.getPostID(this.postid).subscribe(response=>{
          this.post = {
            id: response.post._id,
            title: response.post.title,
            content:response.post.content,
            imagePath: response.post.imagePath,
            creator:response.post.creator};
          this.form.setValue({title: this.post.title, content:this.post.content, image: this.post.imagePath})
          this.imagePreview = this.post.imagePath;
        })
      } else {
        this.mode = "create";
        this.postid = null;
      }
    })
  }

}
