import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import emailjs from '@emailjs/browser';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  theForm!: FormGroup;

  constructor(public fb: FormBuilder, public counter : CounterService) {}

  ngOnInit() {
    emailjs.init('Y6DM3fntyNVwOuI5h');
    this.theForm = this.fb.group({
      to_name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  async onSubmit() {
    const { to_name, code } = this.theForm.value;
    let response = await emailjs.send("service_7lzcizr","template_s3qx4hz",{
      to_name: to_name,
      code: code
    });
    alert("Mail sent");
    this.theForm.reset();
  }
}
