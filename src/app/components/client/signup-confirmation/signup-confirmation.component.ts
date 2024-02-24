import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-signup-confirmation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup-confirmation.component.html',
  styleUrl: './signup-confirmation.component.css'
})
export class ClientSignupConfirmationComponent {
  
  signup_datas = JSON.parse(localStorage.getItem('signup_datas') ?? '{}');
  signupConfirmationForm!: FormGroup;

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    this.signupConfirmationForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupConfirmationForm.value.code === this.signup_datas.code) {
      var formData = new FormData();
      formData.append("nom", this.signup_datas.nom);
      formData.append("email", this.signup_datas.email);
      formData.append("mdp", this.signup_datas.mdp);
      formData.append("pdp", this.signup_datas.pdp);
      formData.append("telephone", this.signup_datas.telephone);
      this.http.post(this.apiUrlService.getUrl() + 'client/signup', formData)
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          alert("Correct confirmation code, sign up done!");
          this.router.navigate(['/client_login']);
        });
    } else {
      alert("Incorrect confirmation code");
      localStorage.removeItem('signup_datas');
      this.router.navigate(['/client_signup']);
    }
  }
}
