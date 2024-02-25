import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiUrlService } from '../../../services/tools/api-url.service';
import _ from "lodash";
import emailjs from '@emailjs/browser';

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
    emailjs.init('Y6DM3fntyNVwOuI5h');
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
        alert("Invalid file type. Only images jpeg or png allowed");
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

  generateCodeMail() {
    return _.random(100000, 999999).toString();
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const clientDatas = {
        'nom': this.signupForm.value.nom,
        'email': this.signupForm.value.email,
        'mdp': this.signupForm.value.mdp,
        'pdp': this.filename,
        'telephone': this.signupForm.value.telephone,
        'code': this.generateCodeMail()
      };
      localStorage.setItem('signup_datas', JSON.stringify(clientDatas));
      const client = JSON.parse(localStorage.getItem('signup_datas') ?? '{}');
      await emailjs.send("service_7lzcizr","template_s3qx4hz",{
        to_name: client.nom + " (" + client.email + ")",
        code: client.code
      });
      alert("Mail sent for confirmation");
      this.router.navigate(['/client_signup_confirmation']);
    } else {
      alert("Please fill in correctly");
    }
  }
}
