import { Component, Input, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user :User | null = {firstname:'', lastname:''};

  constructor(
    private router: Router, private localStorageService: LocalStorageService, private authService: AuthService
  ) {  }

  ngOnInit() {
    this.user = this.localStorageService.getUser();
   
  /*  this.localStorageService.storageChanges$.subscribe((user) => {
      this.user = user;
      
    });*/

   /* this.userService.currentUser.subscribe(
      // update the component's property
      user => this.user = user
    );
    console.log("this.user");
    console.log(this.user);*/
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  returnHome() {
    this.router.navigateByUrl('/');
  }

  navigateTo(choice: string) {
    this.router.navigate([choice]);
  }

  test() {
    document.querySelector('body')?.classList.toggle('toggle-sidebar')
  }

}
