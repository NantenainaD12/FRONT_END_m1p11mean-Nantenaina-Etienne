import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class ClientLogoutComponent {

  constructor(public http:HttpClient, public router : Router) {}

  ngOnInit() {
    localStorage.removeItem('client');
    alert("Deconnected");
    this.router.navigate(['client_login']);
  }
}
