import { Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientHomepageComponent } from './components/client/homepage/homepage.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent },
    { path: 'client_homepage', component: ClientHomepageComponent }
];
