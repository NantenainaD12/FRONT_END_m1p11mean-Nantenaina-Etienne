import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { EmployeLoginComponentComponent } from './components/employe/employeLoginComponent/employe-login-component.component';
import { EmployeListeRdvComponent } from './components/employe/employe-liste-rdv/employe-liste-rdv.component';
import { ManageprofilComponent } from './components/employe/manageprofil/manageprofil.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'Employe_login', component: EmployeLoginComponentComponent },

    //employe
    { path: 'all_rdv_for_me', component: EmployeListeRdvComponent },
    { path: 'ManageprofilComponent', component: ManageprofilComponent }
    
];
