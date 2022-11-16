import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  ustvariUserja(payload: string) {
    return this.http.post(`${environment.baseURL}user/register`, payload);
  }
  logirajUserja(payload: string) {
    return this.http.post(`${environment.baseURL}user/login`, payload);
  }
  pridobiPodatke() {
    return this.http.get(`${environment.baseURL}user/data`);
  }


  constructor(private http: HttpClient) {}
}
