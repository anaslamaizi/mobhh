import { Component } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile-page',
    imports: [CommonModule, FormsModule],
    templateUrl: './user-profile-page.component.html',
    styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {
  user :User | null = null;

  firstname:string | undefined= '';
  lastname:string | undefined= '';
  email:string | undefined= '';
  job:string | undefined= '';
  company:string | undefined= '';
  currentPassword:string | undefined= '';
  newPassword:string | undefined= '';
  renewPassword:string | undefined= '';
  fileName:string | undefined= '';


  constructor(private localStorageService: LocalStorageService, private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.localStorageService.getUser();
   /* this.userService.currentUser.subscribe(
      // update the component's property
      user => this.user = user
    );*/

    this.firstname = this.user?.firstname;
    this.lastname = this.user?.lastname;
    this.email = this.user?.email;
    this.job = this.user?.job;
    this.company = this.user?.company;
  }

  onSubmitProfile(){
    if (this.user) {
      this.user.firstname = this.firstname;
      this.user.lastname = this.lastname;
      this.user.email = this.email;
    this.user.job = this.job;
    this.user.company = this.company;
    


    console.log(this.user);
    this.authService.updateUser(this.user).subscribe(res=>{console.log(res)});
    //this.userService.updateUser(this.user);

    this.localStorageService.setUser(this.user);
    window.location.reload();
    }
   }

   onSubmitPassword(){
    if (this.user) {
      if (this.currentPassword === this.user.password && this.newPassword === this.renewPassword) {
      this.user.password = this.newPassword;
      
    this.authService.updateUser(this.user).subscribe(res=>{console.log(res)});

   // this.userService.updateUser(this.user);

    this.localStorageService.setUser(this.user);
    window.location.reload();
      } else {

      }
    }
   }

   onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {
console.log("upload file");
        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

       // const upload$ = this.http.post("/api/thumbnail-upload", formData);

       // upload$.subscribe();
    }
}
}
