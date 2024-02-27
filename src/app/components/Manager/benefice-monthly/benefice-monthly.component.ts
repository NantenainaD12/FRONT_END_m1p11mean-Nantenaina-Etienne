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
  selector: 'app-benefice-monthly',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './benefice-monthly.component.html',
  styleUrl: './benefice-monthly.component.css'
})
export class BeneficeMonthlyComponent {
  data: any;
  dataDepense: any;
  searchForm: FormGroup;
  searchFormDepense: FormGroup;
  depenseForm: FormGroup;
   moisNoms = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { 
    this.searchForm = this.fb.group({
      mois: ['', Validators.required]
    });
    this.searchFormDepense = this.fb.group({
      moisDepense: ['', Validators.required]
    });
    this.depenseForm = this.fb.group({
      dateDepense: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }
  getBeneficeMonthly(mois: number) {
    const url = `${this.apiUrlService.getUrl()}Manager/Get_benfice_monthly`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec le jour et le mois
    const body = {mois: mois };

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
    this.getBeneficeMonthly(new Date().getMonth()+1);
    this.GetDepensemonthly(new Date().getMonth()+1);
  }
  
  onSubmit(): void {
    if (this.searchForm.valid) {
      this.getBeneficeMonthly(this.searchForm.value.mois);
      this.GetDepensemonthly(this.searchForm.value.mois);
    }
  }

  onSubmitDepense(): void {
    
    if (this.depenseForm.valid) {
      this.CreateDepense(this.depenseForm.value);
      this.getBeneficeMonthly(this.searchForm.value.mois);
      this.GetDepensemonthly(this.searchForm.value.mois);
    }
  }
  
  CreateDepense(serviceData: any) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/CreateDepense';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec les données du service
    const body = {
      description: serviceData.description,
      dateDepense: serviceData.dateDepense,
      montant: serviceData.amount
    };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        console.log(data);
        this.depenseForm.reset();
        //this.GetAllOffre();
        // Vous pouvez ajouter ici des actions à effectuer après la création du service
        alert('Depense created');
      }, (error) => {
        console.error('Erreur lors de la création du service :', error);
      });
  }

  GetDepensemonthly(moisDepense: number) {
    const url = `${this.apiUrlService.getUrl()}Manager/GetDepensemonthly`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec le jour et le mois
    const body = {mois: moisDepense };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        this.dataDepense = data ;
        console.table(this.dataDepense);
      }, (error) => {
        console.error('Erreur lors de la récupération des données de réservation :', error);
      });
  }
  
}
