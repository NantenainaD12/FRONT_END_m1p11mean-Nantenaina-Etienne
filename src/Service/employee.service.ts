import { Injectable } from '@angular/core';
import { Employee } from '../Model/Employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly APIUrl = "http://localhost:3001/";

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des employés
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + 'GetAllEmployee');
  }
}
