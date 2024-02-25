import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { Rdv } from '../../../Model/Rdv.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-count-reservation-daymounth',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './count-reservation-daymounth.component.html',
  styleUrl: './count-reservation-daymounth.component.css'
})
export class CountReservationDaymounthComponent {
  data: any;
  searchForm: FormGroup;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { 
    this.searchForm = this.fb.group({
      jour: ['', Validators.required],
      mois: ['', Validators.required]
    });
  }


  getCountReservation_Day_month(jour: number, mois: number) {
    const url = `${this.apiUrlService.getUrl()}Manager/CoutReservation_Day_month`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec le jour et le mois
    const body = { jour: jour, mois: mois };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        this.data = data ;
        console.table(this.data);
      }, (error) => {
        console.error('Erreur lors de la récupération des données de réservation :', error);
      });

  }
  ngOnInit() {
    this.getCountReservation_Day_month(16, 2);
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.getCountReservation_Day_month(this.searchForm.value.jour, this.searchForm.value.mois);
    }
  }
}
