import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule, FormsModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  employmentInput: string = '';
  photo: string = '';
  onSubmit(){
   // this.user.firstName=this.firstNameInput;
 //   this.user.lastName=this.lastNameInput;
  //  this.userChange.emit(this.user);
 
 
  
  
   }
  }


