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
  selector: 'app-welcome-manager',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './welcome-manager.component.html',
  styleUrl: './welcome-manager.component.css'
})
export class WelcomeManagerComponent {
  serviceForm: FormGroup;
  dataSource: any;
  employeeForm: FormGroup;
  constructor(public fb: FormBuilder, public apiUrlService: ApiUrlService, public http: HttpClient, private router: Router) {
    this.serviceForm = this.fb.group({
      description: ['', Validators.required],
      Photo: ['', Validators.required],
      dureeMinute: ['', Validators.required],
      prix: ['', Validators.required],
      commission: ['', Validators.required]
    });
    this.employeeForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      mdp: ['', Validators.required],
      pdp: ['', Validators.required],
      horaireDebut: ['', Validators.required],
      horaireFin: ['', Validators.required]
    });
    
  }


  onSubmit(): void {
      this.CreateService(this.serviceForm.value);
  }
  onSubmitEmployee(): void {
    if (this.employeeForm.valid) {
      this.createEmployee(this.employeeForm.value);
    }
  }

  createEmployee(employeeData: any) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Employe/createEmployee';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Effectuez la requête POST
    this.http.post(url, employeeData, { headers })
    .subscribe((data: any) => {
        console.log(data);
        alert("insert employee done!");
        this.employeeForm.reset();
    }, (error) => {
        console.error('Erreur lors de la création de l\'employé :', error);
    });
  }

  CreateService(serviceData: any) {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/CreateService';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Préparez le corps de la requête avec les données du service
      console.log("phpto ");
    const body = {
      description: serviceData.description,
      dureeMinute: serviceData.dureeMinute,
      prix: serviceData.prix,
      commission: serviceData.commission,
      Photo: serviceData.Photo
    };

    // Effectuez la requête POST
    this.http.post(url, body, { headers })
      .subscribe((data: any) => {
        console.log(data);
        alert("new services added !!");
        this.GetAllServices();
        // Vous pouvez ajouter ici des actions à effectuer après la création du service
      }, (error) => {
        console.error('Erreur lors de la création du service :', error);
      });
  }

  ngOnInit() {
    this.GetAllServices();
  }
  GetAllServices() {
    const token = localStorage.getItem('token');

    const url = this.apiUrlService.getUrl() + 'Manager/GetAllServices';

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
  deleteService(Service: any) {
    const url = `${this.apiUrlService.getUrl()}Manager/DeleteService/${Service._idService}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Perform the DELETE request
    this.http.post(url, { headers })
        .subscribe(
            () => {
              alert("Service deleted");
                console.log(`Service with ID ${Service._idService} deleted successfully.`);
                this.GetAllServices();
            },
            (error) => {
                console.error('Error while deleting depense:', error);
                // Handle error cases (e.g., display an error message).
            }
        );
}

readFile(event: Event) {
  const reader = new FileReader();
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    reader.onloadend = () => {
      // Convertit l'image en base64
      const base64Image = reader.result as string;

      // Stocke la valeur dans la propriété Base64Photo du formulaire
      console.log("aona ahh");
      
      this.serviceForm.patchValue({ Photo: base64Image });
    };
    reader.readAsDataURL(file);
  }
}
randomIndex() {
  return Math.floor(Math.random() * 3) + 1;
}

}
