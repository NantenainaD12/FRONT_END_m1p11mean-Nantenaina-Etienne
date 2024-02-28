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
  selector: 'app-average-works-employer',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './average-works-employer.component.html',
  styleUrl: './average-works-employer.component.css'
})
export class AverageWorksEmployerComponent {
  data: any;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { 
  }
  getAverageWorks() {
    const url = `${this.apiUrlService.getUrl()}Manager/Get_moyenneHeureEmploye`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    // Effectuez la requête POST
    this.http.get(url,{ headers })
      .subscribe((data: any) => {
        this.data = data ;
        console.table(this.data);
      }, (error) => {
        console.error('Erreur lors de la récupération des données de average works :', error);
      });
  }
  ngOnInit() {
    this.getAverageWorks();
  }
}
