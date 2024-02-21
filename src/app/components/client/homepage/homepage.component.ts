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

  constructor(public fb: FormBuilder, public apiUrlService : ApiUrlService, public http:HttpClient, public router : Router) {}

  ngOnInit() {
    this.http.get(this.apiUrlService.getUrl() + 'client/homepage')
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
          const value = JSON.parse(jsonData).telephone;
          console.log(value);
        });
  }
}