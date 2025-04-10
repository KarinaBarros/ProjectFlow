import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'], 
  standalone: true
  
})
export class CadastroComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.loading = true;
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.loading = false;
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.error = 'Erro no cadastro: ' + err.error
        this.loading = false;
      }
    });
  }
}
