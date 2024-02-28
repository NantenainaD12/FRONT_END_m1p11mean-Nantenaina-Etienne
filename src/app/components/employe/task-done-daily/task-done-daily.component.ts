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
  selector: 'app-task-done-daily',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './task-done-daily.component.html',
  styleUrl: './task-done-daily.component.css'
})
export class TaskDoneDailyComponent {

  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { }
  data: any[] = [];

  getEmployeeTaskDaily() {
    const idEmploye = localStorage.getItem('idEmploye');
    // get current date and send to the request
    const currentDate = new Date();
    ///JUST FOR TEST
    const specificDate = new Date('2024-02-16T00:00:00.000Z');

    const startDate = currentDate.toISOString();
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();
    const url = `${this.apiUrlService.getUrl()}Employe/rdvs_done_daily_with_commission/${idEmploye}?datedebut=${startDate}&datefin=${endDate}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers })
      .subscribe((data: any) => {
        this.data = data;
        console.table(data);
      }, (error) => {
        console.error('Erreur lors de la récupération des données de l\'employé :', error);
      });
  }
  ngOnInit() {
    this.getEmployeeTaskDaily();
  }

}
