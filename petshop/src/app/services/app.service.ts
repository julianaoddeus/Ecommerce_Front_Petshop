import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { Product } from '../models/product.model';
import { Security } from '../util/security.util';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public composeHeaders(){
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiURL}/products`);
  }

  authenticate(data: any) {
    return this.http.post(`${environment.apiURL}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${environment.apiURL}/accounts/refresh-token`, null, { headers: this.composeHeaders() });
  }

   create(data: any) {
    return this.http.post(`${environment.apiURL}/accounts`, data);
   }

   resetPassword(data: any) {
    return this.http.post(`${environment.apiURL}/accounts/reset-password`, data);
   }

   getProfile() {
    return this.http.get(`${environment.apiURL}/accounts`, { headers: this.composeHeaders() } )
   }

   updateProfile(data: any) {
    return this.http.put(`${environment.apiURL}/accounts`, data, { headers: this.composeHeaders() } )
   }
}
