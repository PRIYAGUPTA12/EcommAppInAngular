import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Seller {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiUrl = 'http://localhost:3000/seller';
  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);


  constructor(private http: HttpClient) {}

  userSignup(data: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.apiUrl, data);
  }
  userLogin(data: { email: string, password: string }): Observable<Seller[]> {
    const url = `${this.apiUrl}?email=${data.email}&password=${data.password}`;
    return this.http.get<Seller[]>(url);
  }
  reloadSeller() {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.isSellerLoggedIn.next(true);
    }
  }
  
  
}
