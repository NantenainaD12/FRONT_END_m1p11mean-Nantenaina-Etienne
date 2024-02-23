import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class ClientBookingComponent {
  client = JSON.parse(localStorage.getItem('client') ?? '{}');
  services: any;
  employes: any;
  bookingForm!: FormGroup;

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    this.getServices();
    this.getEmployes();
    this.bookingForm = this.fb.group({
      dateDebut: ['', Validators.required],
      heureDebut: ['', Validators.required],
      idEmploye: ['', Validators.required],
      idServices: [, Validators.required]
    });
  }

  getServices() {
    this.http.get(this.apiUrlService.getUrl() + 'Manager/GetAllServices')
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
        });
  }

  getEmployes() {
    this.http.get(this.apiUrlService.getUrl() + 'employe/get_employes')
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

  onSubmit() {
    if (this.bookingForm.valid) {
      const { dateDebut, heureDebut, idEmploye, idServices } = this.bookingForm.value;
      var formData = new FormData();
      formData.append("dateDebut", dateDebut);
      formData.append("heureDebut", heureDebut);
      formData.append("idEmploye", idEmploye);
      formData.append("idServices", idServices);
      console.log('formData :>> ', formData);
      
      // this.http.post(this.apiUrlService.getUrl() + 'client/signin', formData)
      //   .pipe(
      //     catchError(error => {
      //       const jsonData = JSON.stringify(error);
      //       const errorMessage = JSON.parse(jsonData).error;
      //       alert(errorMessage);
      //       return throwError(error);
      //     })
      //   )
      //   .subscribe(data => {
      //     localStorage.setItem('client', JSON.stringify(data));
      //     this.router.navigate(['client_homepage']);
      //   });
    } else {
      alert("Please fill in correctly");
    }
  }
}
