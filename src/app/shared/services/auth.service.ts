import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseHttp } from '../api';
import { HttpResponse } from '../interfaces/api/http-response.interface';
import { ForgotPassword, Login } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  login(data: Login): Observable<HttpResponse<string>> {
    const url = `${this.baseUrl}/auth/connect/token`;
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append('username', data.email);
    formData.append('password', data.password);
    formData.append('grant_type', 'password');
    formData.append('scope', 'offline_access api1');
    formData.append('client_id', 'resource_server_1');
    formData.append('client_secret', '846B62D0-DEF9-4215-A99D-86E6B8DAB342');
    return this.http.post<HttpResponse<string>>(url, formData, {
      withCredentials: true,
    });
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
    return this.http.get<HttpResponse<boolean>>(
      `${this.baseUrl}/auth/connect/logout`,
      { withCredentials: true }
    );
  }

  getInfo() {
    const url = `${this.baseUrl}/api/info`;
    return this.http.get<HttpResponse<string>>(url, { withCredentials: true });
  }
}
