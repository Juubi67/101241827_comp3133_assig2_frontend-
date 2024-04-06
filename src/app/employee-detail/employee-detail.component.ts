import { Component } from '@angular/core';
import { Employee } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent {
  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  employee: Employee | null = null;

  ngOnInit() {
    let eid = '';
    this.route.params.subscribe((params) => {
      eid = params['eid'];
    });
    if (eid) {
      this.fetch(eid);
    }
  }

  fetch(eid: string) {
    this.apollo
      .query({
        query: gql`
          query ($eid: ID!) {
            searchEmployeeById(eid: $eid) {
              first_name
              last_name
              email
              gender
              salary
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
          console.log({ d });
          this.employee = d.searchEmployeeById;
        },
        (error) => {
          console.log('error :', error);
        }
      );
  }
}
