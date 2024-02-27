import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-preference',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class ClientPreferenceComponent {

  client = JSON.parse(localStorage.getItem('client') ?? '{}');
  employes: any[] = [];
  services: any[] = [];
  
  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    this.getEmployePreferences();
    this.getServicePreferences();
  }

  getServicePreferences() {
    this.http.get(this.apiUrlService.getUrl() + 'client/service_preference?idClient=' + this.client._idClient)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          this.services = JSON.parse(JSON.stringify(data));
          // console.log('this.services :>> ', this.services);
        });
  }

  getEmployePreferences() {
    this.http.get(this.apiUrlService.getUrl() + 'client/employe_preference?idClient=' + this.client._idClient)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          this.employes = JSON.parse(JSON.stringify(data));
        });
  }
}
