import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { EmployeLoginComponentComponent } from './components/employe/employeLoginComponent/employe-login-component.component';
import { EmployeListeRdvComponent } from './components/employe/employe-liste-rdv/employe-liste-rdv.component';
import { ServiceManagerComponent } from './components/Manager/service-manager/service-manager.component';
import { ManageprofilComponent } from './components/employe/manageprofil/manageprofil.component';
import { WelcomeManagerComponent } from './components/Manager/welcome-manager/welcome-manager.component';
import { ChiffreAffaireMonthlyComponent } from './components/Manager/chiffre-affaire-monthly/chiffre-affaire-monthly.component';
import { ChiffreAffaireDailyComponent } from './components/Manager/chiffre-affaire-daily/chiffre-affaire-daily.component';
import { CountReservationMounthlyComponent } from './components/Manager/count-reservation-mounthly/count-reservation-mounthly.component';
import { CountReservationDaymounthComponent } from './components/Manager/count-reservation-daymounth/count-reservation-daymounth.component';
import { TaskDoneDailyComponent } from './components/employe/task-done-daily/task-done-daily.component';
import { RdvServiceComponent } from './components/employe/rdv-service/rdv-service.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'Employe_login', component: EmployeLoginComponentComponent },

    //employe
    { path: 'all_rdv_for_me', component: EmployeListeRdvComponent },
    { path: 'ManageprofilComponent', component: ManageprofilComponent },
    { path: 'TaskDoneDailyComponent', component: TaskDoneDailyComponent },
    { path: 'RdvServiceComponent/:idRdv', component: RdvServiceComponent },


    //service
    { path: 'ServiceManagerComponent', component: ServiceManagerComponent },

    //mamager
    { path: 'WelcomeManagerComponent', component: WelcomeManagerComponent },
    { path: 'CountReservationDaymounthComponent', component: CountReservationDaymounthComponent },
    { path: 'CountReservationMounthlyComponent', component: CountReservationMounthlyComponent },
    { path: 'ChiffreAffaireDailyComponent', component: ChiffreAffaireDailyComponent },
    { path: 'ChiffreAffaireMonthlyComponent', component: ChiffreAffaireMonthlyComponent }

    

];
