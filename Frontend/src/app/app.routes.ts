import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {
        path: 'projetos', 
        component: ProjetosComponent,
        canActivate: [AuthGuard]
    },
];
