import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http:HttpClient) { }

  getEmployees():Observable<any>{
    return this.http.get('http://localhost:3000/employe')
  }

  createEmploye(employe):Observable<any>{
    return this.http.put('http://localhost:3000/employe',employe)
  }

  getSingleUser(id):Observable<any>{
    return this.http.get('http://localhost:3000/employe/'+id)
  }

  updateEmploye(id,updatedUser):Observable<any>{
    return this.http.put('http://localhost:3000/employe/'+id,updatedUser)
  }
  updateEmployeStatus(id,status):Observable<any>{
    console.log('Service'+ status)
    return this.http.put('http://localhost:3000/employe/status/'+id,{status:status})
  }

  deleteEmploye(id):Observable<any>{
    return this.http.delete('http://localhost:3000/employe/'+id)
  }

  getAttendance():Observable<any>{
    return this.http.get('http://localhost:3000/attendance')
  }
  postAttendance(details):Observable<any>{
    console.log(details,'service')
    return this.http.post('http://localhost:3000/attendance',details)
  }

  changeAttendance(date,employe,attendanceStatus):Observable<any>{
    console.log('service')
    return this.http.put('http://localhost:3000/attendance',{date:date,employe:employe,attendanceType:attendanceStatus})
  }

  getEmployeByToken(token):Observable<any>{
    return this.http.post('http://localhost:3000/employe/employebytoken',{token:token})
  }

  approveEmployee(id):Observable<any>{
    return this.http.post('http://localhost:3000/users/hrverify',{token:localStorage.getItem('token'),empId:id})
  }

}

