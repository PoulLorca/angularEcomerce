import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { Auth } from '../components/models/auth.model';
import { User } from '../components/models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth'; 

  constructor(
    private http : HttpClient,
    private tokeService : TokenService
  ) { }

  login(email: string,  password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response=>
        this.tokeService.saveToken(response.access_token))
    );
  }

  getProfile(){
    //const headers = new HttpHeaders();
    //headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      //headers:{
        //Authorization:`Bearer ${token}`,
        // 'Content-type': 'application/json'
      //}
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }
}
