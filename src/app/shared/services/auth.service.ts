import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { BaseHttp } from '../api';
import { HttpResponse } from '../interfaces/api/http-response.interface';
import { ForgotPassword, Login } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  login(data: Login): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/api/auth/login`;
    // return this.http.post<HttpResponse<boolean>>(url, data);
    return of({ code: '200', data: true, message: 'login' });
  }

  register(data: Login): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/api/auth/register`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  forgotPassword(data: ForgotPassword) {
    const url = `${this.baseUrl}/api/auth/forgot-password`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  logout(): Observable<HttpResponse<boolean>> {
    // return this.http.get<HttpResponse<boolean>>(
    //   `${this.baseUrl}/api/auth/forgot-password/logout`
    // );
    return of({ code: '200', data: true, message: 'logout' });
  }

  getCurrentUser(): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/api/auth/get-current-user`;
    // return this.http.get<HttpResponse<boolean>>(url);
    const isAuth = localStorage.getItem('isAuth');
    debugger;
    if (isAuth) {
      return of({ code: '200', data: true, message: 'user' });
    } else {
      return of({ code: '200', data: false, message: 'user' });
    }
  }
}
