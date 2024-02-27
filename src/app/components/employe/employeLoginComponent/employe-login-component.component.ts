import { Component } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe-login-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './employe-login-component.component.html',
  styleUrl: './employe-login-component.component.css'
})
export class EmployeLoginComponentComponent {
  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient,private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['Nanted12.doe@example.com', [Validators.required, Validators.email]],
      mdp: ['Nanted12.doe@example.com', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, mdp } = this.loginForm.value;
      var formData = new FormData();
      formData.append("email", email);
      formData.append("mdp", mdp);
      console.log(this.apiUrlService.getUrl() + 'Employe/LoginEmployee');
      
      this.http.post(this.apiUrlService.getUrl() + 'Employe/LoginEmployee', formData)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).message;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          const jsonData = JSON.stringify(data);
          const id_emp = JSON.parse(jsonData).employee.idEmploye;
          const token = JSON.parse(jsonData).token;
          localStorage.setItem('token', token);
          localStorage.setItem('idEmploye', id_emp);
          this.router.navigate(['/all_rdv_for_me']);
        });
    }
  }


}
