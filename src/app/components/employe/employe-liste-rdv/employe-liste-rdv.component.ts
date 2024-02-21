import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { Rdv  } from '../../../Model/Rdv.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe-liste-rdv',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './employe-liste-rdv.component.html',
  styleUrl: './employe-liste-rdv.component.css'
})
export class EmployeListeRdvComponent {
  dataSource: Rdv [] = [];

  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.GetAllRDV();
  }


  GetAllRDV() {
    const token = localStorage.getItem('token');
    const idEmploye = localStorage.getItem('idEmploye');

    const url = this.apiUrlService.getUrl() + 'Employe/rdvs/' + idEmploye;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Effectuez la requête GET
    this.http.get(url, { headers })
    .subscribe((data: any) => {
      this.dataSource = data as Rdv[];
      
      // Boucle pour afficher les données de chaque Rdv
      for (let rdv of this.dataSource) {
        console.log(rdv);
      }
    });
    

  }
}
