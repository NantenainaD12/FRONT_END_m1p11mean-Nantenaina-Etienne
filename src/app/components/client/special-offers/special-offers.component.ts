import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiUrlService } from '../../../services/tools/api-url.service';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './special-offers.component.html',
  styleUrl: './special-offers.component.css'
})
export class ClientSpecialOffersComponent {
  client = JSON.parse(localStorage.getItem('client') ?? '{}');
  today = new Date();
  special_offers_notifications: any[] = [];

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  updateTime() {
    this.today = new Date();
  }

  interval = setInterval(() => {
    this.updateTime();
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.http.get(this.apiUrlService.getUrl() + 'client/special_offers_notifications')
        .pipe(
          catchError(error => {
            const jsonData = JSON.stringify(error);
            const errorMessage = JSON.parse(jsonData).error;
            alert(errorMessage);
            return throwError(error);
          })
        )
        .subscribe(data => {
          this.special_offers_notifications = JSON.parse(JSON.stringify(data));
        });
  }
}
