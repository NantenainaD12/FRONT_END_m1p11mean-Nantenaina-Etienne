import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ClientLoginComponent } from './components/client/login/login.component';
import { EmployeLoginComponentComponent } from './components/employe/employeLoginComponent/employe-login-component.component';
import { EmployeListeRdvComponent } from './components/employe/employe-liste-rdv/employe-liste-rdv.component';
import { ServiceManagerComponent } from './components/Manager/service-manager/service-manager.component';
import { ManageprofilComponent } from './components/employe/manageprofil/manageprofil.component';
import { WelcomeManagerComponent } from './components/Manager/welcome-manager/welcome-manager.component';
import { ChiffreAffaireMonthlyComponent } from './components/Manager/chiffre-affaire-monthly/chiffre-affaire-monthly.component';
import { ChiffreAffaireDailyComponent } from './components/Manager/chiffre-affaire-daily/chiffre-affaire-daily.component';
import { BeneficeMonthlyComponent } from './components/Manager/benefice-monthly/benefice-monthly.component';
import { OffreSpecialManagerComponent } from './components/Manager/offre-special-manager/offre-special-manager.component';
import { CountReservationMounthlyComponent } from './components/Manager/count-reservation-mounthly/count-reservation-mounthly.component';
import { CountReservationDaymounthComponent } from './components/Manager/count-reservation-daymounth/count-reservation-daymounth.component';
import { TaskDoneDailyComponent } from './components/employe/task-done-daily/task-done-daily.component';
import { RdvServiceComponent } from './components/employe/rdv-service/rdv-service.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientHomepageComponent } from './components/client/homepage/homepage.component';
import { ClientLogoutComponent } from './components/client/logout/logout.component'; 
import { ClientSignupComponent } from './components/client/signup/signup.component';
import { ClientBookingComponent } from './components/client/booking/booking.component';
import { ClientAppointmentHistoryComponent } from './components/client/appointment-history/appointment-history.component';
import { ClientPreferenceComponent } from './components/client/preference/preference.component';
import { ClientSignupConfirmationComponent } from './components/client/signup-confirmation/signup-confirmation.component';
import { ClientSpecialOffersComponent } from './components/client/special-offers/special-offers.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'client_homepage', component: ClientHomepageComponent },
    { path: 'client_logout', component: ClientLogoutComponent },
    { path: 'client_signup', component: ClientSignupComponent },
    { path: 'client_booking', component: ClientBookingComponent },
    { path: 'client_appointment_history', component: ClientAppointmentHistoryComponent },
    { path: 'client_preference', component: ClientPreferenceComponent },
    { path: 'client_signup_confirmation', component: ClientSignupConfirmationComponent },
    { path: 'client_special_offers', component: ClientSpecialOffersComponent },
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
    { path: 'ChiffreAffaireMonthlyComponent', component: ChiffreAffaireMonthlyComponent },
    { path: 'OffreSpecialManagerComponent', component: OffreSpecialManagerComponent },
    { path: 'BeneficeMonthlyComponent', component: BeneficeMonthlyComponent },

    

];
