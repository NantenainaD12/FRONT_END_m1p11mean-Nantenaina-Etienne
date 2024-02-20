import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class ClientLoginComponent {
  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['e.rakotoarison@email.com', [Validators.required, Validators.email]],
      mdp: ['cli1', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, mdp } = this.loginForm.value;
      var formData = new FormData();
      formData.append("email", email);
      formData.append("mdp", mdp);
      this.http.post(this.apiUrlService.getUrl() + 'client/signin', formData)
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
          const telephoneNumber = JSON.parse(jsonData).telephone;
          alert(telephoneNumber);
        });
    }
  }
}
