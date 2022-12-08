import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {PasswordChecker} from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms-app';
  registerForm! : FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
  
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTandC: [false, Validators.requiredTrue]
    }, {
      validators: PasswordChecker("password", "confirmPassword")
    })
  }

  get s(){
  return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted= true;
    if(this.registerForm.invalid){
      return;
    }
    console.table(this.registerForm.value);
    console.log(this.registerForm);

    alert("Successfully signed Up" + JSON.stringify(this.registerForm.value))
  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }



}
