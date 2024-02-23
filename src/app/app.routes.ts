import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientHomepageComponent } from './components/client/homepage/homepage.component';
import { ClientLogoutComponent } from './components/client/logout/logout.component'; 
import { ClientSignupComponent } from './components/client/signup/signup.component';
import { ClientBookingComponent } from './components/client/booking/booking.component';
import { ClientAppointmentHistoryComponent } from './components/client/appointment-history/appointment-history.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'client_homepage', component: ClientHomepageComponent },
    { path: 'client_logout', component: ClientLogoutComponent },
    { path: 'client_signup', component: ClientSignupComponent },
    { path: 'client_booking', component: ClientBookingComponent },
    { path: 'client_appointment_history', component: ClientAppointmentHistoryComponent }
];
