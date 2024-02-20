import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientLoginComponent } from './components/client/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'client_login', component: ClientLoginComponent }
];
