import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor(private sellerService: SellerService, private router: Router) {}
  ngOnInit() {
    this.sellerService.isLoginError.subscribe((error) => {
      if (error) {
        this.errorMsg = 'Invalid login credentials';
      }
    });
  }
  
  login() {
    this.sellerService.userLogin(this.loginData).subscribe({
      next: (res) => {
        if (res.length > 0) {
          // Login success
          localStorage.setItem('seller', JSON.stringify(res[0]));
          this.sellerService.isSellerLoggedIn.next(true); // update login status
          this.router.navigate(['/seller-home']);
        } else {
          // Login failed
          this.sellerService.isLoginError.emit(true);
        }
      },
      error: () => {
        this.sellerService.isLoginError.emit(true);
      }
    });
  }
  
}
