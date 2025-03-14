import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: User = {
    firstname: '',
  lastname: '',
  username: '',
  password: ''};

@Output() userChange = new EventEmitter<User>();
  usernameInput: string= '';
  passwordInput: string = '';

  constructor(private authService: AuthService, private router:Router, private localStorageService:LocalStorageService, private userService:UserService) {

  }
  
  onSubmit(){
   this.user.username=this.usernameInput;
   this.user.password=this.passwordInput;

this.authService.login(this.usernameInput, this.passwordInput)
   .subscribe((users: User[]) => {
    let user: User | null = users[0];
     if (user) {
      console.log("authentication ok");
        this.localStorageService.setUser(user);

       // this.userService.updateUser(user);

           this.router.navigate(['/home-choice']);
       } else {
        console.log("authentication ko");
           this.router.navigate(['/login']);
       }
          });
  }
} 
