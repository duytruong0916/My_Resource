import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { Post } from '../post.model'
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mine-type.validator';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../image.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public orientation;
  public imagePreview;
  uploadedImage: File;
  public mode: string = 'create';
  public isLoading = false;
  public postid: string;
  public post: Post;
  public form: FormGroup;
  public enteredvalue;
  constructor(private postservice: PostService,
    private activateroute: ActivatedRoute,
    private imageservice: ImageService
  ) { }
  onAddPost() {
    console.log(this.form)
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == "create") {
      // console.log(this.form.value)
      this.postservice.addPost(this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    else {
      // console.log(this.form.value)
      this.postservice.updatePost(this.postid, this.form.get('title').value, this.form.get('content').value, this.form.get('image').value);
    }
    this.form.reset();
  }
  onImageHandler(e) {
    const file = e.target.files[0];
    if(!file){
      return;
    }
    const filename = file.name;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload= (ev) => {
      const img = new Image();
      var base64 = (ev.target as any).result;
      img.src = base64;
      const orientation = this.imageservice.getOrientation(base64);
      console.log(orientation)
      this.imagePreview = (ev.target as any).result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        const width = 500;
        const scaleFactor = width / img.width;
        const height = img.height * scaleFactor;
        // set proper canvas dimensions before transform & export
        if (4 < orientation && orientation < 9) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        // transform context before drawing image
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
          case 7: ctx.transform(0, -1, -1, 0, height, width); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
          default: break;
        }
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], filename, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          this.form.patchValue({image:file});
           this.form.get('image').updateValueAndValidity();
          console.log(this.form.get('image').value)

         // this.file = file
        }, 'image/jpeg', 1);
      }
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    })
    this.isLoading = true;
    this.activateroute.paramMap.subscribe((paramap) => {
      this.isLoading = false;
      if (paramap.has('postid')) {
        this.mode = "edit";
        this.postid = paramap.get('postid');
        this.postservice.getPostID(this.postid).subscribe(response => {
          this.post = {
            id: response.post._id,
            title: response.post.title,
            content: response.post.content,
            imagePath: response.post.imagePath,
            creator: response.post.creator
          };
          this.form.setValue({ title: this.post.title, content: this.post.content, image: this.post.imagePath })
          this.imagePreview = this.post.imagePath;
        })
      } else {
        this.mode = "create";
        this.postid = null;
      }
    })
  }

}
