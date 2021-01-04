import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from './../../shared/services/employe.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  otherDetailForm:FormGroup
  id;
  updatedEmploye =  {
    personalDetails:'',
    otherDetails:{},
    familyDetails:{},
    educationDetails:{},
    experience: {},
    reference: {}
  }
  personalDetail:Boolean=false
  otherDetail:Boolean=false
  familyDetail:Boolean=false
  educationDetail:Boolean=false
  experienceDetail:Boolean=false
  referenceDetail:Boolean=false
  personalDetails={
    _id:'',
    firstname:'',
    lastname:'',
    phone:'',
    username:''
  }
  otherDetails = {
    designation:'',
    aadhar:'',
    pan:'',
    address:'',
    status:'',
    doj:''
  }
  familyDetails={
    fathername:'',
    mothername:'',
    foccupation:'',
    moccupation:'',
    emergency1:'',
    emergency2:''
  }
  educationDetails=[{
    course:'',
    organization:'',
    stream:'',
    yearofpassing:'',
    result:''
  }]
  experienceTable = [];
  referenceTable = [];
  newExperience ={}
  newReference ={}

  constructor(private router:Router, private route:ActivatedRoute, private employeService:EmployeService, private fb:FormBuilder) {
    this.createEmployeForm()
   }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.route.queryParams.subscribe((params)=>{
        if(params.id){
          this.id=params.id
          this.employeService.getSingleUser(params.id).subscribe((employee)=>{
            console.log(employee)
            this.personalDetails=employee.personalDetails
            this.otherDetails = employee.otherDetails
            this.familyDetails=employee.familyDetails
            this.educationDetails=employee.educationDetails
            this.experienceTable=employee.experience
            this.referenceTable=employee.reference
          })
        }
      })
    }
    else
    this.router.navigate(['/login'])
  }

  createEmployeForm(){
    
    this.otherDetailForm = this.fb.group({
      designation:['',[Validators.required,Validators.minLength(2)]],
      aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      pan: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      status: ['', [Validators.required]],
      doj: ['', [Validators.required]]
    })
  }

  updateEmployee(){
    console.log(this.otherDetailForm.value)
    console.log(this.otherDetailForm.valid)
    if(this.otherDetailForm.valid){
    this.updatedEmploye.personalDetails = this.personalDetails._id
    this.updatedEmploye.otherDetails = this.otherDetails
    this.updatedEmploye.familyDetails = this.familyDetails
    this.updatedEmploye.educationDetails = this.educationDetails
    this.updatedEmploye.experience = this.experienceTable
    this.updatedEmploye.reference = this.referenceTable
    console.log(this.updatedEmploye)
    this.employeService.updateEmploye(this.id,this.updatedEmploye).subscribe((resp)=>{
      if(resp.success==true) this.router.navigate(['/dashboard'])
      else alert(resp.message)
    })
  }
}

  addExperience(i){
    this.newExperience={
    company:'',
    designation:'',
    from:'',
    to:'',
    salary:'',
    contact:''
  }
  this.experienceTable.push(this.newExperience)
  console.log(this.experienceTable)
  }

  deleteExperience(i){
    if(this.experienceTable.length == 1){
      alert('Atleast one row is required')
      return false
    }
    else{
      this.experienceTable.splice(i,1);
      alert('Row Deleted')
    } 
  }
  addReference(i){
    this.newReference = {  
      name:'',
      email:'',
      contact:''}
  this.referenceTable.push(this.newReference)
  console.log(this.referenceTable)
  }

  deleteReference(i){
    if(this.referenceTable.length == 1){
      alert('Atleast one row is required')
      return false
    }
    else{
      this.referenceTable.splice(i,1);
      alert('Row Deleted')
    } 
  }

  hidePersonal(){
    this.personalDetail=!this.personalDetail
  }
  hideOther(){
    this.otherDetail=!this.otherDetail
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
