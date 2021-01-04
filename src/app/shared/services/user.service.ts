import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  createUser(user):Observable<any>{
    return this.http.post('http://localhost:3000/users/signup',user)
  }

  login(user):Observable<any>{
    return this.http.post('http://localhost:3000/users/login',user)
  }

  checkHR(token):Observable<any>{
    return this.http.post('http://localhost:3000/employe/checkHR',{token:token})
  }
}
