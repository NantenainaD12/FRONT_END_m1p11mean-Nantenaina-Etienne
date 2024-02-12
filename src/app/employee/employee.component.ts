import { Component } from '@angular/core';
import {Employee} from "../../Model/Employee";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from '../../Service/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports:  [RouterOutlet ,HttpClientModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  readonly APIUrl = "http://localhost:3001/";
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés :', error);
      }
    );
  }
  
}
