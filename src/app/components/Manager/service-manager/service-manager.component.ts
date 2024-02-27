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
  selector: 'app-service-manager',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './service-manager.component.html',
  styleUrl: './service-manager.component.css'
})
export class ServiceManagerComponent {
  serviceForm: FormGroup;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) {
    this.serviceForm = this.fb.group({
      description: ['', Validators.required],
      dureeMinute: ['', Validators.required],
      prix: ['', Validators.required],
      commission: ['', Validators.required]
    });
  }




  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.CreateService(this.serviceForm.value);
    }
  }
  CreateService(serviceData: any) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/CreateService';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec les données du service
    const body = {
      description: serviceData.description,
      dureeMinute: serviceData.dureeMinute,
      prix: serviceData.prix,
      commission: serviceData.commission
    };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        console.log(data);
        // Vous pouvez ajouter ici des actions à effectuer après la création du service
      }, (error) => {
        console.error('Erreur lors de la création du service :', error);
      });
  }


}

