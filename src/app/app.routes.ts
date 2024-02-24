import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { EmployeLoginComponentComponent } from './components/employe/employeLoginComponent/employe-login-component.component';
import { EmployeListeRdvComponent } from './components/employe/employe-liste-rdv/employe-liste-rdv.component';
import { ManageprofilComponent } from './components/employe/manageprofil/manageprofil.component';
import { TaskDoneDailyComponent } from './components/employe/task-done-daily/task-done-daily.component';
import { RdvServiceComponent } from './components/employe/rdv-service/rdv-service.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: 'n', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'Employe_login', component: EmployeLoginComponentComponent },

    //employe
    { path: 'all_rdv_for_me', component: EmployeListeRdvComponent },
    { path: 'ManageprofilComponent', component: ManageprofilComponent },
    { path: 'TaskDoneDailyComponent', component: TaskDoneDailyComponent },
    { path: 'RdvServiceComponent/:idRdv', component: RdvServiceComponent }

    
];
