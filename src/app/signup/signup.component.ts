import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Apollo } from 'apollo-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private apollo: Apollo, private auth: AuthService) {}

  register(username: string, password: string, email: string) {
    this.auth.register(username, password, email);
  }
}
