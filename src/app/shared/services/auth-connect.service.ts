import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIUrls, BaseHttp } from '../api';
import { HttpResponse } from '../interfaces/api/http-response.interface';
import {
  CheckToken,
  ForgotPassword,
  Login,
  ResetPassword,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthConnectService extends BaseHttp {
  private url = `${this.baseUrl}/${APIUrls.Auth}/connect`;
  login(data: Login): Observable<HttpResponse<string>> {
    const url = `${this.url}/token`;
    return this.http.post<HttpResponse<string>>(url, data);
  }

  register(data: Login): Observable<HttpResponse<boolean>> {
    const url = `${this.url}/register`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  resetPassword(data: ResetPassword): Observable<HttpResponse<boolean>> {
    const url = `${this.url}/resetPassword`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  forgotPassword(data: ForgotPassword) {
    const url = `${this.url}/forgotPassword`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  checkRegisterToken(data: CheckToken) {
    const url = `${this.url}/checkRegisterToken`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  checkTokenValidation(data: CheckToken) {
    const url = `${this.url}/verifyToken`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }
}
