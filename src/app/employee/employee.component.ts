import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Employee } from '../types';
import { map } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  constructor(private apollo: Apollo, private router: Router) {}
  employees: Employee[] = [];

  isUser: boolean = !!localStorage.getItem('token');

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            getAllEmployees {
              _id
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result) => {
          const r = result.data as any;
          this.employees = [];
          console.log({ emo: r.getAllEmployees });
          this.employees = r.getAllEmployees;
          return result;
        })
      )
      .subscribe(
        ({ data }) => {},
        (error) => {
          console.log('error :', error);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  delete(eid: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($eid: ID!) {
            deleteEmployeeById(eid: $eid) {
              first_name
              last_name
            }
          }
        `,
        variables: {
          eid,
        },
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
        },
        (error) => {
          console.log('error :', error);
        }
      );
    this.employees = this.employees.filter((emp) => emp._id !== eid);
  }
}
