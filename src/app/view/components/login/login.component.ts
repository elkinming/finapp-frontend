import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'view-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNewUser = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl({
      value: '',
      disabled: true
    }, [Validators.required]),
  });



  constructor() { }

  ngOnInit() {
  }

  onSubmit(){}

  changeToNewUserForm(){
    this.isNewUser = true;
    this.loginForm.controls['password2'].enable();
  }

  changeToLoginForm(){
    this.isNewUser = false;
    this.loginForm.controls['password2'].disable();
  }

  get labelUsername(){
    return this.isNewUser ? "New Username" : "Username"
  }

  get labelPassword(){
    return this.isNewUser ? "New Password" : "Password"
  }

  get labelButtonSubmit(){
    return this.isNewUser ? "Create User" : "Login"
  }

  get labelCreateUser(){
    return this.isNewUser ? "Cancel" : "Create new user"
  }

  checkPasswordMatch(){
    if (this.loginForm.controls['password'].value == this.loginForm.controls['password2'].value) {
      return true;
    } else {
      return false;
    }
  }

}
