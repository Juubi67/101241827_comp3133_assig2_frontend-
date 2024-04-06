import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  formData = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0,
  };

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($input: EmployeeInput!) {
            addNewEmployee(input: $input) {
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          input: {
            ...this.formData,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
          console.log(d);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('error :', error);
        }
      );
  }
}
