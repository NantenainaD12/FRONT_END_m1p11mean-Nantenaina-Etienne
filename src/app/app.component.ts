import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sallon_beaute';
  readonly APIUrl = "http://localhost:3001/";

  constructor(private http:HttpClient){
  }

  Quotes:any=[];
  refreshQuotes(){
    console.log(this.APIUrl+'GetAllEmployee');
    this.http.get(this.APIUrl+'GetAllEmployee').subscribe(data=>{
      this.Quotes = data;
    })
  }
  ngOnInit(){
    this.refreshQuotes();
  }

  addQuotes() {
    var nom = (<HTMLInputElement>document.getElementById('nom')).value;
    var prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var salaire = (<HTMLInputElement>document.getElementById('salaire')).value;

    // var formData = new FormData();
    // formData.append('name', Quotes_name);
    // formData.append('quote', Quote);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    var quoteData = {
      nom: nom,
      prenom: prenom,
      email:email,
      salaire:salaire
    };

    this.http.post(this.APIUrl + 'user/createEmployee', quoteData).subscribe(data => {
      // alert(data);
      this.refreshQuotes();
    })
  }

  deleteQuotes(name:any){
    console.log(this.APIUrl+'Delete_quote?name='+name);
    this.http.delete(this.APIUrl+'Delete_quote?name='+name).subscribe(data =>{
      // alert(data);
      this.refreshQuotes();
    })
  }

}
