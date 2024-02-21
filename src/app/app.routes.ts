import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { EmployeLoginComponentComponent } from './components/employe/employeLoginComponent/employe-login-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'Employe_login', component: EmployeLoginComponentComponent }
    
];
