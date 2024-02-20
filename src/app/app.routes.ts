import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'navbar', component: NavbarComponent }
];
