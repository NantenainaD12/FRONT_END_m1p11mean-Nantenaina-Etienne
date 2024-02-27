import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { Rdv } from '../../../Model/Rdv.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rdv-service',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './rdv-service.component.html',
  styleUrl: './rdv-service.component.css'
})
export class RdvServiceComponent {
  rdvServices: any; // Ajoutez cette ligne
  idRdv: string;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.idRdv = '';
  }

  ngOnInit() {
    let idRdvParam = this.route.snapshot.paramMap.get('idRdv');
    if (idRdvParam) {
      this.idRdv = idRdvParam;
      this.getRdvServicesBy_idRdv(this.idRdv);
    } else {
      console.error('idRdv not found in route parameters');
    }

  }

  getRdvServicesBy_idRdv(idRdv: string) {
    const url = this.apiUrlService.getUrl() + 'Employe/getRdvServiceBy_idRdv/' + idRdv;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers })
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.rdvServices = data; // Les données reçues sont assignées à rdvServices
          console.log(this.rdvServices);
        } else {
          console.error('Aucun service de rendez-vous trouvé avec cet idRdv');
        }
      }, (error) => {
        console.error('Erreur lors de la récupération des services de rendez-vous :', error);
      });
  }

}
