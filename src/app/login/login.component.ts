
import {ChangeDetectionStrategy, Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {  Router } from '@angular/router';
import {DataService} from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-100%)', opacity: 0 })), // Start position (off-screen left)
      transition(':enter', [
        animate('1.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ])
  ]
})
export class LoginComponent  {

 
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,private route:Router,private data:DataService) {
    // chane emailId
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  checkLoginCredentials() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const { email, password } = this.loginForm.value;

      // Call the backend login API
      this.data.login(email, password).subscribe(
        (response) => {
          console.log('Login Success:', response);
          
          // Store JWT token in localStorage or sessionStorage
          localStorage.setItem('jwtToken', response.token);

          // Navigate to the authenticated route
          this.route.navigate(['/dashboard']); // Redirect to a dashboard or home
        },
        (error) => {
          console.error('Login Error:', error);
          alert('Invalid credentials!');
        }
      );
      this.route.navigate(['/dashboard'])
    }
  }
  
  hide(){
    this.hidePassword=!this.hidePassword;
  }

 
}
