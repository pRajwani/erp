import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { EmployeService } from '../shared/services/employe.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @ViewChild('loginform') loginFormDirective:NgForm;
    loginForm:FormGroup
    detail
    details= []
    attendanceType
    employe
    loginData={username:'',password:''}
    loginformErrors={
        "username":'',
        "password":''
    };
    loginvalidationMessages = {
        'username': {
          'required': 'username is required',
          'pattern': 'username not in valid format'
        },
        'password': {
          'required': 'password is required',
          'minlength': 'password must be at least 8 characters long',
          'maxlength': 'password cannot be more than 8 characters long'
        }
      }

    constructor(private route:ActivatedRoute,public router: Router,private fb:FormBuilder, private userService:UserService, private employeService:EmployeService) {
        this.createLoginForm()
    }

    ngOnInit() {
        if(localStorage.getItem('token'))
            this.router.navigate(['/dashboard'])
        this.route.queryParams.subscribe((params)=>{
            if(params.new)
            alert('Confirm email before logging in')
        })
        this.detail = {
            employe:'',
            attendanceType:'Present'
        }
        this.details= []
        this.loginData={
            username:'',
            password:''
        }
    }

    createLoginForm(){
        this.loginForm= this.fb.group({
            username:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password:['',[Validators.maxLength(8),Validators.minLength(8)]]
        })
        this.loginForm.valueChanges.subscribe(data=>this.onValueChanges(data))
    }

    onValueChanges(data?:any){
        if(!this.loginForm)
            return
        const form = this.loginForm;
        for(const field in this.loginformErrors) {
            if(this.loginformErrors.hasOwnProperty(field)) {
            // clear previous error messages (if any)
            this.loginformErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid) {
                const messages = this.loginvalidationMessages[field];
                for(const key in control.errors) {
                if(control.errors.hasOwnProperty(key)){
                    this.loginformErrors[field] += messages[key] + ' ';
                }
                }
            }
            }
        }
    }

    loginUser(){
        if(this.loginForm.valid)
        {
            let user =this.loginForm.value
            this.userService.login(user).subscribe(async (resp)=>{
                if(resp&&resp.success==true){
                    this.userService.checkHR(resp.token).subscribe((resp)=>{
                        console.log(resp,'resp')
                        if(resp===true){
                            this.employeService.getEmployees().subscribe((employees)=>{
                                console.log(employees)
                                employees.forEach(employe => {
                                    if(employe.otherDetails&&employe.otherDetails.status=='Current')
                                    {
                                        console.log(employe,'emp check')
                                    this.detail = {employe:employe._id,attendanceType:'Present'}
                                    this.details.push(this.detail)
                                    }
                                });
                                console.log(this.details)
                                let day = new Date().getDay()
                                if(day!==0&&this.details.length>0){
                                    this.employeService.postAttendance(this.details).subscribe((resp)=>{
                                        console.log(resp)
                                        if(resp.success==true&&resp.resp){
                                            console.log(resp.resp)
                                        }
                                    })
                                }
                            })

                        //     this.employeService.getEmployees().subscribe((employee)=>{
                        //         console.log(employee)
                        //     for(let i=0;i<employee.length;i++){
                        //         this.attendanceType = 'Present'
                        //         this.employe = employee[i]._id
                        //         this.details.push(JSON.parse(JSON.stringify({attendanceType:this.attendanceType,employe:this.employe})))
                        //     }
                        //     let attendance =  {
                        //         date: new Date().toLocaleString(),
                        //         details: this.details   
                        //     }
                        //     let day = new Date().getDay()
                        //     if(attendance&& day!==0) {
                        //         console.log(attendance.details)
                        //         this.employeService.postAttendance(attendance).subscribe((resp)=>{
                        //             if(resp.success==true){
                        //                 console.log('Attendance registered')
                        //                 if(resp.resp)
                        //                 console.log(resp.resp)
                        //                 if(resp.message)
                        //                 console.log(resp.message)
                        //             }
                        //             else console.log(resp.message)
                        //         })
                        //     }
                        //     if(day==0){
                        //         alert('Attendance cannot be registered on Sunday')
                        //     }
                        // })  
                    }
                                
                    
                })
                localStorage.setItem('token',resp.token)
                this.router.navigate(['/dashboard'])
            }
                else{
                    alert(resp.message)
                }
            })
        }
    }
}
