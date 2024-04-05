import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Employee } from '../types';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  constructor(private apollo: Apollo, private router: Router) {}
  employees: Employee[] = [];

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.apollo
      .query({
        query: gql`
          query {
            getAllEmployees {
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
          console.log({ d });
          this.employees = d.getAllEmployees;
        },
        (error) => {
          console.log('error :', error);
        }
      );
  }
}
