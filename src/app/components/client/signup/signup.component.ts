import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class ClientSignupComponent {
  signupForm!: FormGroup;
  file: any;
  filename: any;
  reader = new FileReader();

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      pdp: ['', Validators.required],
      telephone: ['', Validators.required]
    });
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
    if(this.file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(this.file.type)) {
        alert("Invalid file type. Only images allowed");
        this.signupForm = this.fb.group({
          pdp: ['', Validators.required],
        });
      } else {
        this.reader.readAsDataURL(this.file);
        this.reader.onloadend = () => {
          this.filename = this.reader.result as string;
        }
      }
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { nom, email, mdp, telephone } = this.signupForm.value;
      var formData = new FormData();
      formData.append("nom", nom);
      formData.append("email", email);
      formData.append("mdp", mdp);
      formData.append("pdp", this.filename);
      formData.append("telephone", telephone);
      console.log('formData :>> ', formData);
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
          alert("Signed Up");
          this.router.navigate(['/client_login']);
        });
    } else {
      alert("Please fill in correctly");
    }
  }
}
