import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {  Router } from '@angular/router';
import {DataService} from '../data.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {


  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword=true;

  constructor(private fb: FormBuilder,private route:Router,private data:DataService) {
    // chane emailId
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['',[Validators.required, Validators.minLength(6)]]
    }, { validators: mustMatch('password', 'confirmPassword') }); // Apply the validator

  }

  registerNewUser() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      console.log('Form Submitted', this.registerForm.value.email);
      console.log('Form Submitted', this.registerForm.value.password);
      let newUser={
        "emailId":this.registerForm.value.email,
        "password":this.registerForm.value.password
      }
      this.data.addNewUsers(newUser).subscribe(data => {
        this.route.navigate(['/login'])
      });

    }
  }
  
  hide(){
    this.hidePassword=!this.hidePassword;
  }

}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null; // Exit if controls are not found
    }

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null; // Skip if another validator is already failing
    }

    // Set error if values don't match
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}

