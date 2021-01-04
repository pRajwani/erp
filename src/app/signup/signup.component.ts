import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { routerTransition } from '../router.animations';
import { ImageUploadService } from '../shared/services/image-upload.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    @ViewChild('signupform') signupFormDirective:NgForm
    signupForm:FormGroup
    signupformErrors = {
        'firstname': '',
        'lastname': '',
        'username': '',
        'phone': '',
        'password': ''
      };
      signupvalidationMessages = {
        'username': {
          'required': 'username is required',
          'pattern': 'username not in valid format'
        },
        'password': {
          'required': 'password is required',
          'minlength': 'password must be at least 8 characters long',
          'maxlength': 'password cannot be more than 8 characters long'
        },
        'firstname': {
          'required':  'firstname is required',
          'minlength': 'firstname must be at least 5 characters long',
          'maxlength': 'firstname cannot be more than 20 characters long'
        },
        'lastname': {
          'required':  'lastname is required',
          'minlength': 'lastname must be at least 5 characters long',
          'maxlength': 'lastname cannot be more than 20 characters long'
        },
        'phone': {
          'required':  'phone is required',
          'minlength': 'phone number must be of 10 digits only',
          'maxlength': 'phone number must be of 10 digits only'
        }
      }
      userData={
          firstname:'',
          lastname:'',
          username:'',
          phone:'',
          image:null
      }
      
      imageChangedEvent: any = '';
      croppedImage: any = '';
      imageName
      selectedFile:File
    constructor(private fb:FormBuilder, private userService:UserService,private router:Router,private imageUploadService:ImageUploadService) {
        this.createSignupform()
    }

    ngOnInit() {
        this.userData={
            firstname:'',
            lastname:'',
            username:'',
            phone:'',
            image:null
        }
    }

    createSignupform(){
        this.signupForm = this.fb.group({
            firstname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
            lastname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
            phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
            username:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            image:[]
        })
        this.signupForm.valueChanges.subscribe(data=>this.onSignupValueChanged(data))
    }

    onSignupValueChanged(data?:any){
        if(!this.signupForm)
          return
        const form=this.signupForm;
        for(const field in this.signupformErrors) {
          if(this.signupformErrors.hasOwnProperty(field)) {
            // clear previous error messages (if any)
            this.signupformErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid) {
              const messages = this.signupvalidationMessages[field];
              for(const key in control.errors) {
                if(control.errors.hasOwnProperty(key)){
                  this.signupformErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }

      uploadImage(event){
        this.selectedFile=event.target.files[0]; 
        this.userData.image = this.selectedFile.name
      }
    createUser(){
        if(this.signupForm.valid){
            let newUser = this.signupForm.value
            newUser.image = this.selectedFile.name
            const uploadData = new FormData();
            uploadData.append('image', this.selectedFile, this.selectedFile.name);
            this.userService.createUser(newUser).subscribe((user)=>{
                if(user){
                  this.imageUploadService.imageUpload(uploadData).subscribe((resp)=>{
                    if(resp.success==true)
                    this.router.navigate(['/login'],{queryParams:{"new":true}})
                    else
                    alert(resp.message)
                  })
                }
            })
        }
    }

}
