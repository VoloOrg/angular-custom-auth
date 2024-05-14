import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIUrls, BaseHttp } from '../api';
import { HttpResponse } from '../interfaces/api/http-response.interface';
import { ChangePassword, InviteUser, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthAccountService extends BaseHttp {
  private url = `${this.baseUrl}/${APIUrls.Auth}/account`;

  changePassword(data: ChangePassword) {
    const url = `${this.url}/changePassword`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }

  logout(): Observable<HttpResponse<boolean>> {
    const url = `${this.url}/logout`;
    return this.http.get<HttpResponse<boolean>>(url);
  }

  getCurrentUser() {
    const url = `${this.url}/currentUser`;
    return this.http.get<HttpResponse<User>>(url);
  }

  inviteUser(data: InviteUser) {
    const url = `${this.baseUrl}/${APIUrls.Auth}/inviteUser`;
    return this.http.post<HttpResponse<boolean>>(url, data);
  }
}
