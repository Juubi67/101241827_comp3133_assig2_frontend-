import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent {
  formData = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0,
  };

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  eid: string = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eid = params['eid'];
    });
    if (this.eid) {
      this.fetch(this.eid);
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
          const { first_name, last_name, email, gender, salary } =
            d.searchEmployeeById;

          this.formData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            salary: salary,
          };
        },
        (error) => {
          console.log('error :', error);
        }
      );
  }

  onSubmit() {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($eid: ID!, $input: EmployeeInput!) {
            updateEmployeeById(eid: $eid, input: $input) {
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          eid: this.eid,
          input: {
            first_name: this.formData.first_name,
            last_name: this.formData.last_name,
            email: this.formData.email,
            gender: this.formData.gender,
            salary: this.formData.salary,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
          window.location.href = '/';
        },
        (error) => {
          console.log('error :', error);
        }
      );
  }
}
