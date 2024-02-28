import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  private readonly apiUrl = "https://m1p14mean-nantenaina-etienne.netlify.app/.netlify/functions/api/";

  getUrl() {
    return this.apiUrl;
  }
}