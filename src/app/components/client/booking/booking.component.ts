import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class ClientBookingComponent {
  client = JSON.parse(localStorage.getItem('client') ?? '{}');
  services: any;
  employes: any;
  bookingForm!: FormGroup;
  todo = [];
  done = [];

  drop(event: CdkDragDrop<never[], any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.getServices();
    this.getEmployes();
    this.bookingForm = this.fb.group({
      dateDebut: ['', Validators.required],
      heureDebut: ['', Validators.required],
      idEmploye: ['', Validators.required]
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
        this.todo = this.services;
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

  hasIdService(element: any): element is { _idService: string } {
    return typeof element._idService === 'string';
  }

  onSubmit() {
    let idServices: any[] = [];
    this.done.forEach(element => {
      idServices.push(JSON.parse(JSON.stringify(element))._idService);
    });
    if (this.bookingForm.valid && idServices.length > 0) {
      const { dateDebut, heureDebut, idEmploye } = this.bookingForm.value;
      var formData = new FormData();
      formData.append("dateHeureDebut", dateDebut + "T" + heureDebut + ":00");
      formData.append("idEmploye", idEmploye);
      formData.append("idServices", idServices.join(","));
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
          this.router.navigate(['client_appointment_history']);
        });
    } else {
      alert("Please fill in correctly");
    }
  }
}
