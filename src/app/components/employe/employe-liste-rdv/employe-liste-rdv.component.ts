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
  selector: 'app-employe-liste-rdv',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './employe-liste-rdv.component.html',
  styleUrl: './employe-liste-rdv.component.css'
})
export class EmployeListeRdvComponent {
  dataSource: Rdv[] = [];

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

  UpdateEtatRdv(idRdv: Number) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Employe/updateEtatFini/' + idRdv;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec etatFini
    const body = { etatFini: true };

    // Effectuez la requête PUT
    this.http.put(url, body, { headers })
      .subscribe((data: any) => {
        console.log(data);
        this.GetAllRDV();
      }, (error) => {
        console.error('Erreur lors de la mise à jour de etatFini :', error);
      });
  }
  employee = {
    nom: '',
    email: '',
    pdp: '',
    horaireDebut: '',
    horaireFin: ''
  };
  // Ajoutez cette fonction dans votre composant
  readFile(event: Event) {
    const reader = new FileReader();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      reader.onloadend = () => {
        this.employee.pdp = reader.result as string; // Convertit l'image en base64
      };
      reader.readAsDataURL(file);
    }
  }
  updateEmployee() {
    const idEmploye = localStorage.getItem('idEmploye');
    const token = localStorage.getItem('token');
    const url = this.apiUrlService.getUrl() + 'Employe/updateEmployee/' + idEmploye;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(url, this.employee, { headers })
      .subscribe((data: any) => {
        alert("Modification saved successfully");
        this.getEmployeeData();
      }, (error) => {
        console.error('Erreur lors de la mise à jour de l\'employé :', error);
      });
  }
  getEmployeeData() {
    const idEmploye = localStorage.getItem('idEmploye');
    const url = this.apiUrlService.getUrl() + 'Employe/getEmployeById/' + idEmploye;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers })
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.employee = data[0];
        } else {
          console.error('Aucun employé trouvé avec cet idEmploye');
        }
      }, (error) => {
        console.error('Erreur lors de la récupération des données de l\'employé :', error);
      });
  }
  async onSubmitRappel(rdv: any) {
    console.log(rdv);
    emailjs.init('ndLjxh28nA8aGD-dQ');
    emailjs.send("service_giys12l", "template_4jw4nmz", {
      nom_client: "etienne",
      dateDebut: rdv.dateHeureDebut,
      dateFin: rdv.dateHeureFin,
      montant: rdv.montantTotalPaye,
      nom_employe: rdv.employeeName,
    });
  }


}
