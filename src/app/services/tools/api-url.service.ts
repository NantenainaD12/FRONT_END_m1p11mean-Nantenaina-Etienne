import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  private readonly apiUrl = "http://localhost:3001/";

  getUrl() {
    return this.apiUrl;
  }
}
