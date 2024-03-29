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
  selector: 'app-chiffre-affaire-daily',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './chiffre-affaire-daily.component.html',
  styleUrl: './chiffre-affaire-daily.component.css'
})
export class ChiffreAffaireDailyComponent {
  data: any;
  searchForm: FormGroup;
  moisNoms = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) {
    this.searchForm = this.fb.group({
      jour: ['', Validators.required],
      mois: ['', Validators.required]
    });
  }
  getChiffreAffaire_Day_month(jour: number, mois: number) {
    const url = `${this.apiUrlService.getUrl()}Manager/ChiffreAffaireParJour`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec le jour et le mois
    const body = { jour: jour, mois: mois };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        this.data = data;
        console.table(this.data);
      }, (error) => {
        console.error('Erreur lors de la récupération des données de réservation :', error);
      });
  }
  ngOnInit() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Le jour du mois (de 1 à 31)
    const currentMonth = currentDate.getMonth() + 1; // Les mois sont indexés à partir de 0 en JavaScript, donc nous ajoutons 1

    this.getChiffreAffaire_Day_month(currentDay, currentMonth);
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.getChiffreAffaire_Day_month(this.searchForm.value.jour, this.searchForm.value.mois);
    }
  }

}
