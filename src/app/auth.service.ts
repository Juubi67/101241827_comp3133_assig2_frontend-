import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private router: Router
  ) {}

  login(username: string, password: string) {
    this.apollo
      .query({
        query: gql`
          query login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: {
          username,
          password,
        },
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
          const token = d.login.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('error loging in:', error);
        }
      );
  }

  register(username: string, password: string, email: string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($input: UserInput!) {
            signup(input: $input) {
              username
              email
              password
              token
            }
          }
        `,
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          const d = data as any;
          const token = d.signup.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('error registering:', error);
        }
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
