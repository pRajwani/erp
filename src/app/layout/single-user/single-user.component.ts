import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from './../../shared/services/employe.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  employee
  personalDetail:Boolean=false
  otherdetail:Boolean=false
  familyDetail:Boolean=false
  educationDetail:Boolean=false
  experienceDetail:Boolean=false
  referenceDetail:Boolean=false
  constructor(private route:ActivatedRoute,private router:Router,private employeService:EmployeService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.route.queryParams.subscribe((params)=>{
        if(params.id){
          this.employeService.getSingleUser(params.id).subscribe((employee)=>{
            this.employee = employee
            console.log(employee)
          })
        }
        else
        this.router.navigate(['/viewemployees'])
      })
    }
    else
    this.router.navigate(['/login'])
  }

  hidePersonal(){
    this.personalDetail=!this.personalDetail
  }
  hideOther(){
    this.otherdetail=!this.otherdetail
  }
  hideFamily(){
    this.familyDetail=!this.familyDetail
  }
  hideEducation(){
    this.educationDetail=!this.educationDetail
  }
  hideExperience(){
    this.experienceDetail=!this.experienceDetail
  }
  hideReference(){
    this.referenceDetail=!this.referenceDetail
  }
  

  
}
