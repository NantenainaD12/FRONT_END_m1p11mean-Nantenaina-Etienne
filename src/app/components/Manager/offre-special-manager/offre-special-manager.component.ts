import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { Rdv } from '../../../Model/Rdv.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-offre-special-manager',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './offre-special-manager.component.html',
  styleUrl: './offre-special-manager.component.css'
})
export class OffreSpecialManagerComponent {
  serviceForm: FormGroup;
  dataSource: any;
  servicesList: any;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) {
    this.serviceForm = this.fb.group({
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      idService: ['', Validators.required],
      pourcentageRemise: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.CreateOffreSpecial(this.serviceForm.value);
    }
  }
  ngOnInit() {
    this.GetAllOffre();
    this.GetAllServices();
  }

  CreateOffreSpecial(serviceData: any) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/CreateOffreSpecial';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec les données du service
    const body = {
      description: serviceData.description,
      dateDebut: serviceData.dateDebut,
      dateFin: serviceData.dateFin,
      idService: serviceData.idService,
      pourcentageRemise: serviceData.pourcentageRemise
    };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        console.log(data);
        this.serviceForm.reset();
        this.GetAllOffre();
        // Vous pouvez ajouter ici des actions à effectuer après la création du service
      }, (error) => {
        console.error('Erreur lors de la création du service :', error);
      });
  }
  GetAllOffre() {
    const token = localStorage.getItem('token');
    const currentDate = new Date();
    // const specificDate = new Date('2024-02-16T00:00:00.000Z');
    // const specificDate2 = new Date('2024-03-16T00:00:00.000Z');
    // const startDate = specificDate.toISOString();
    // const EndDate = specificDate2.toISOString();

    const url = `${this.apiUrlService.getUrl()}Manager/getOffreSpecialValid/2?dateBegin=${currentDate}&dateEnd=${currentDate}`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Effectuez la requête GET
    this.http.get(url, { headers })
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.dataSource = data;
          console.log(this.dataSource);
        }
        else {
          console.error('Aucun service de rendez-vous trouvé avec cet idRdv');
        }
      });
  }

 async onSubmitNotify(service: any) {
    console.log(service);
    emailjs.init('ndLjxh28nA8aGD-dQ');
    await emailjs.send("service_giys12l", "template_9hrkwzi", {
      offre: service.nomService,
      debut: service.dateDebut,
      fin: service.dateFin,
      remise: '-' + (service.pourcentageRemise * 100) + '%',
      service: service.nomService,
    });
  }
  GetAllServices() {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/GetAllServices';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Effectuez la requête GET
    this.http.get(url, { headers })
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.servicesList = data;
          console.log(this.servicesList);
        }
        else {
          console.error('Aucun service de rendez-vous trouvé avec cet idRdv');
        }
      });
  }
}
