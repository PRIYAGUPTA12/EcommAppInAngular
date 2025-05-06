import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService, Seller } from '../services/seller.service'; // adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  seller: Seller = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private sellerService: SellerService, private router:Router) {}

  signUp() {
    if (this.seller.name && this.seller.email && this.seller.password) {
      this.sellerService.userSignup(this.seller).subscribe({
        next: (res) => {
          localStorage.setItem('seller', JSON.stringify(res)); // Save session
          this.router.navigate(['/login']);// Redirect
        }
      });
      
    } else {
      alert('Please fill out all fields.');
    }
  }
}
