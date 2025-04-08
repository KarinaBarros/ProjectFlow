import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProjetosComponent } from './projetos/projetos.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'projetos', component: ProjetosComponent}
];
