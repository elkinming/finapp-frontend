import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreateUserResponse, LoginResponse } from '../interfaces/HttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUserAPI = environment.userAPI;

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<any>(this.urlUserAPI + "/user/login", { username, password });
  }

  createUser(user: any): Observable<CreateUserResponse> {
    return this.http.post<any>(this.urlUserAPI + "/user", { user });
  }

}
