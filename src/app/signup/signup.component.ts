import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-signup',
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: User = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: ''};

  usernameInput="";
  passwordInput="";
  firstnameInput="";
  lastnameInput="";
  emailInput="";

  constructor(private authService: AuthService, private router:Router, private localStorageService:LocalStorageService, private userService:UserService) {

  }
  
  onSubmit(){
    this.user.username=this.usernameInput;
    this.user.password=this.passwordInput;
    this.user.firstname=this.firstnameInput;
    this.user.lastname=this.lastnameInput;
    this.user.email=this.emailInput;
    
 this.authService.signup(this.user)
    .subscribe(() => {
   
       console.log("registration ok");

 
            this.router.navigate(['/login']);
         
           });
   }
}
