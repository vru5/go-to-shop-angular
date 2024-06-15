import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { LoginUserRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(registerRequest: RegisterRequest){
    return this.http.post<any>(`http://localhost:8084/register`, registerRequest).pipe(map((res)=> {return res}));
  }

  loginUser(loginRequest: LoginUserRequest) {
    return this.http.post<any>(`http://localhost:8084/login`, loginRequest).pipe(map((res) => { return res}));
  }
}
