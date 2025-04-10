// src/app/components/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () =>  {
        this.loading = false;
        this.router.navigate(['/projetos']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciais inválidas';
      }
    });
  }
}


