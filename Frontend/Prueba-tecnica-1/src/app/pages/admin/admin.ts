import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login';
import { inject } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
 private _loginService = inject(LoginService);

  logout(){
    this._loginService.logout();
  }
}
