import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: EmployeeComponent },
  { path: 'employee/create', component: CreateEmployeeComponent },
  { path: 'employee/view/:eid', component: EmployeeDetailComponent },
  { path: 'employee/edit/:eid', component: EmployeeEditComponent },
];
