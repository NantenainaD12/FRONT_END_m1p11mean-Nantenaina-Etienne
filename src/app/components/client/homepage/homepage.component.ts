import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class ClientHomepageComponent {
  client = JSON.parse(localStorage.getItem('client') ?? '{}');

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    console.log('client :>> ', this.client._idClient);
    // this.http.get(this.apiUrlService.getUrl() + 'client/homepage', {
    //   withCredentials: true
    // }).subscribe((resp: any) => {
    //   console.log(resp);
    // }, (errorResp) => {
    //   console.log('Oops, something went wrong getting the logged in status');
    // })
  }
}