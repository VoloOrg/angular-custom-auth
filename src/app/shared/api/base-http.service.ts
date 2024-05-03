import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root',
})
export class BaseHttp {
  constructor(
    @Inject(BASE_URL) protected readonly baseUrl: string,
    protected readonly http: HttpClient
  ) {}
}
