import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserResponse, LoginResponse } from 'src/app/interfaces/HttpResponse.interface';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  onSubmit(){

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if(this.isNewUser){
      if (!this.checkPasswordMatch()) {
        this.loginForm.markAllAsTouched();
        return;
      }

      this.userService.createUser({... this.loginForm.value}).subscribe(
        {
          next: (response: CreateUserResponse) => {
            const msg = `User Created, Please use the credentials to login`;
            this.toastService.show(msg, 'success');
            this.isNewUser = false
          },
          error: (err) => {
            this.dataService.userLogged = undefined;
            this.dataService.activeToken = '';
            const msg = `Error at Creating user, please try again`;
            this.toastService.show(msg, 'danger');
          }
        }
      )

    } else {
      this.userService.login(
        this.loginForm.controls['username'].value!,
        this.loginForm.controls['password'].value!
      ).subscribe(
        {
          next: (loginResponse: LoginResponse) => {
            console.log(loginResponse);
            this.dataService.userLogged = loginResponse.user;
            this.dataService.activeToken = loginResponse.token;
            // this.router.navigateByUrl('/home');
            const msg = `User signed in. Welcome back: ${this.dataService.userLogged.username}`;
            this.toastService.show(msg, 'success');
          },
          error: (err) => {
            this.dataService.userLogged = undefined;
            this.dataService.activeToken = '';
            const msg = `Error at signing in, please try again`;
            this.toastService.show(msg, 'danger');
          }
        }
      )
    }
  }

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
