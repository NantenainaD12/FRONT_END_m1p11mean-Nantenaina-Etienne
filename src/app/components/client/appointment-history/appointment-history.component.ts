import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError, of } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, NgxLoadingModule],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class ClientAppointmentHistoryComponent {

  client = JSON.parse(localStorage.getItem('client') ?? '{}');
  historiques: any[] = [];
  isLoading = of(true);

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = of(true);
    this.getHistoriques();
  }

  async getHistoriques() {
    this.isLoading = of(true);
    await this.http.get(this.apiUrlService.getUrl() + 'client/appointment_history?idClient=' + this.client._idClient)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          this.historiques = JSON.parse(JSON.stringify(data));
          this.isLoading = of(false);
          this.changeDetectorRef.detectChanges();
        });
  }

  async pay(idRdv: any) {
    this.isLoading = of(true);
    await this.http.get(this.apiUrlService.getUrl() + 'client/online_payment?idRdv=' + idRdv)
      .pipe(
        catchError(error => {
          const jsonData = JSON.stringify(error);
          const errorMessage = JSON.parse(jsonData).error;
          alert(errorMessage);
          return throwError(error);
        })
      )
      .subscribe(data => {
        this.getHistoriques();
      });
  }
}
