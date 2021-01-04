import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { EmployeService } from './../../shared/services/employe.service';

@Component({
  selector: 'app-get-user',
  template:'ng2-smart-table',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {
  employe={
    pid:'',
    _id:'',
    firstname:'',
    lastname:'',
    email:'',
    doj:'',
    status:'',
    hrApproval:false
  }
  employees= new Array();
  constructor(private employeService:EmployeService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      
      this.employeService.getEmployees().subscribe((employees)=>{
        console.log(employees)
        for(let i in employees){
          this.employe.pid = employees[i].personalDetails._id
          this.employe._id= employees[i]._id
          this.employe.firstname = employees[i].personalDetails.firstname
          this.employe.lastname = employees[i].personalDetails.lastname
          this.employe.email =  employees[i].personalDetails.username
          this.employe.hrApproval = employees[i].personalDetails.hrApproval
          if(employees[i].otherDetails){
            this.employe.doj =  employees[i].otherDetails.doj
            this.employe.status =  employees[i].otherDetails.status
          }
          else {
            this.employe.doj='NA'
            this.employe.status='NA'
          }
          this.employees.push(JSON.parse(JSON.stringify(this.employe)))
        }
      })
    }
  }

  employeInfo(id){
    this.router.navigate(['/singleEmploye'],{queryParams:{id:id}})
    console.log(id)
  }

  updateEmploye(id){
    this.router.navigate(['/updateEmploye'],{queryParams:{id:id}})
  }

  // deleteEmploye(id){
  //   var deleteemp  = confirm('Do you want to delete this employee')
  //   if(deleteemp==true){
  //     this.employeService.deleteEmploye(id).subscribe((resp)=>{
  //       if(resp.success==true){
  //       var delEmp =this.employees.indexOf(id)
  //       this.employees.splice(delEmp,1)
  //     }
  //     })
  //   }
  // }

  changeStatus(event:any,i){
    console.log(i)
    let id = this.employees[i]._id
    // this.employees[i].status = event.target.value
    let employestatus=event.target.value
    console.log(employestatus)
    this.employeService.updateEmployeStatus(id,employestatus).subscribe((resp)=>console.log(resp))
  }
  
  approveEmploye(id){
    this.userService.checkHR(localStorage.getItem('token')).subscribe((res)=>{
      if(res==true){
        this.employeService.approveEmployee(id).subscribe((resp)=>{
          console.log(resp)
        })
      }
      else alert('You are not authorized to perform this action')
    })
  }


}
