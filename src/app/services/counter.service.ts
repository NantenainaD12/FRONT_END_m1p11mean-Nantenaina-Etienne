import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count = 0;
  
  countMe() {
    this.count++;
  }
}
