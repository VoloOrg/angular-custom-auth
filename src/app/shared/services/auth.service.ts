import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseHttp } from '../api';
import { HttpResponse } from '../interfaces/api/http-response.interface';
import {
  ChangePassword,
  CheckToken,
  ForgotPassword,
  Login,
  ResetPassword,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  login(data: Login): Observable<HttpResponse<string>> {
    const url = `${this.baseUrl}/auth/connect/token`;
    return this.http.post<HttpResponse<string>>(url, data, {
      withCredentials: true,
    });
  }

  changePassword(data: ChangePassword): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/auth/account/changePassword`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }

  resetPassword(data: ResetPassword): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/auth/account/resetPassword`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }

  register(data: Login): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/auth/account/register`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }

  forgotPassword(data: ForgotPassword) {
    const url = `${this.baseUrl}/auth/connect/forgotPassword`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<HttpResponse<boolean>> {
    const url = `${this.baseUrl}/auth/account/logout`;
    return this.http.get<HttpResponse<boolean>>(url, { withCredentials: true });
  }

  getCurrentUser() {
    const url = `${this.baseUrl}/auth/account/currentUser`;
    return this.http.get<HttpResponse<User>>(url, { withCredentials: true });
  }

  checkRegisterToken(data: CheckToken) {
    const url = `${this.baseUrl}/auth/connect/checkRegisterToken`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }

  checkResetToken(data: CheckToken) {
    const url = `${this.baseUrl}/auth/connect/verifyToken`;
    return this.http.post<HttpResponse<boolean>>(url, data, {
      withCredentials: true,
    });
  }
}
