import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private apollo: Apollo, private auth: AuthService) {}

  login(username: string, password: string) {
    this.auth.login(username, password);
  }
}
