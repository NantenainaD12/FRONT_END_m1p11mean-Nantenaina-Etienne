import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  onChange(e: any) {
    const idServices: FormArray = this.bookingForm.get('idServices') as FormArray;
    if (e.target.checked) {
      idServices.push(new FormControl(parseInt(e.target.value, 10)));
    } else {
      let i: number = 0;
      idServices.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          idServices.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit() {
    this.getServices();
    this.getEmployes();
    this.bookingForm = this.fb.group({
      dateDebut: ['', Validators.required],
      heureDebut: ['', Validators.required],
      idEmploye: ['', Validators.required],
      idServices: this.fb.array([])
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
    if (this.bookingForm.valid && this.bookingForm.value.idServices.length > 0) {
      const { dateDebut, heureDebut, idEmploye, idServices } = this.bookingForm.value;
      var formData = new FormData();
      formData.append("dateHeureDebut", dateDebut + "T" + heureDebut + ":00");
      formData.append("idEmploye", idEmploye);
      formData.append("idServices", idServices);
      this.http.post(this.apiUrlService.getUrl() + 'client/appointment_booking?idClient=' + this.client._idClient, formData)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          const newRdv = JSON.parse(JSON.stringify(data));
          console.log('newRdv :>> ', newRdv);
        });
    } else {
      alert("Please fill in correctly");
    }
  }
}
