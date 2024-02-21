import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-employe-login-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './employe-login-component.component.html',
  styleUrl: './employe-login-component.component.css'
})
export class EmployeLoginComponentComponent {
  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['TestUpadteid7.doe@example.com', [Validators.required, Validators.email]],
      mdp: ['TestUpadteid7', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, mdp } = this.loginForm.value;
      var formData = new FormData();
      formData.append("email", email);
      formData.append("mdp", mdp);
      this.http.post(this.apiUrlService.getUrl() + 'Employe/LoginEmployee', formData)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          const jsonData = JSON.stringify(data);
          const name = JSON.parse(jsonData).employee.nom;
          alert(name);
        });
    }
  }
}
