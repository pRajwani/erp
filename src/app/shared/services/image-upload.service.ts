import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http:HttpClient) { }

  imageUpload(imageData):Observable<any>{
    return this.http.post('http://localhost:3000/upload',imageData)
  }
}

