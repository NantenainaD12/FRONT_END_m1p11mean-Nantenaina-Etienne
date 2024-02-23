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
  selector: 'app-manageprofil',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './manageprofil.component.html',
  styleUrl: './manageprofil.component.css'
})
export class ManageprofilComponent {
  employee = {
    nom: '',
    email: '',
    mdp: '',
    pdp: '',
    horaireDebut: '',
    horaireFin: ''
  };
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) { }


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

  ngOnInit() {
    this.getEmployeeData();
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

//   handleFileInput(event: Event) {
//     const target = event.target as HTMLInputElement;
//     if (target.files && target.files.length > 0) {
//         this.fileToUpload = target.files.item(0);
//         if (this.fileToUpload) {
//             var reader = new FileReader();
//             reader.onload = this._handleReaderLoaded.bind(this);
//             reader.readAsBinaryString(this.fileToUpload);
//         }
//     }
// }
//   _handleReaderLoaded(readerEvt: ProgressEvent<FileReader>) {
//     if (readerEvt.target) {
//         var binaryString = readerEvt.target.result;
//         if (typeof binaryString === 'string') {
//             this.employee.pdp = btoa(binaryString);  // Converting binary string data.
//         }
//     }
// }
}
