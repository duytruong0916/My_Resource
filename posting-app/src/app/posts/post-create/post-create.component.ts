import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { Post } from '../post.model'
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mine-type.validator';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public imagePreview;
  uploadedImage: File;
  public mode: string = 'create';
  public isLoading= false;
  public postid: string;
  public post:Post;
  public form: FormGroup;
  public enteredvalue;
  constructor(private postservice: PostService,
              private activateroute: ActivatedRoute,
              private ng2ImgMax: Ng2ImgMaxService,
              public sanitizer: DomSanitizer
              ) { }
  onAddPost() {
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return;
    }
    this.isLoading =true;
    if(this.mode == "create"){
     // console.log(this.form.value)
      this.postservice.addPost(this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    else{
     // console.log(this.form.value)
      this.postservice.updatePost(this.postid, this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    this.form.reset();
  }
  onImageHandler(e){
    const fileName = e.target.files[0].name;
    const file = e.target.files[0];
    if (!file.type.match('image.*'))
    {
      this.imagePreview= '';
      return ;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ev => {
      this.imagePreview= (ev.target as any).result
      const img = new Image();
      img.src = (ev.target as any).result;
      img.onload = () => {
                const elem = document.createElement('canvas');
                const ctx = elem.getContext('2d');
                // img.width and img.height will contain the original dimensions
                const width = 500;
                const scaleFactor = width / img.width;
                elem.width = width;
                elem.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
                ctx.canvas.toBlob((blob) => {
                    const file = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    this.form.patchValue({image:file});
                    this.form.get('image').updateValueAndValidity();
                    //console.log(this.form.get('image').value)
                }, 'image/jpeg', 1);
            },
            reader.onerror = error => console.log(error);
    };
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
          this.imagePreview= this.post.imagePath;
        })
      } else {
        this.mode = "create";
        this.postid = null;
      }
    })
  }

}
