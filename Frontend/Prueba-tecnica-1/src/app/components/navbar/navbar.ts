import { Component, OnInit , inject, } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  baseUrl: string = environment.appUrl;
  logoUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWImfV6pRmgGRWXkPJfCGtKwDBkvOOSXUGxcugESCqx8kEhzLAkcPEttFCHsj0IbXS_2w&usqp=CAU';

  private _loginService = inject(LoginService);
  private router = inject(Router);

  get isvisible(): boolean {
    return this._loginService.isLoggedIn() && this._loginService.isAdmin();
  }

   get showProfile(): boolean {
    return this._loginService.isLoggedIn();
  }

  get showLogin(): boolean {
    return !this._loginService.isLoggedIn();
  }

  ngOnInit() {
  }

    logout() {
    this._loginService.logout();
    this.router.navigate(['/']); 
  }
}
