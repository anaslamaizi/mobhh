import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  USER_INIT:User = {id: 0,
    firstname: '',
    lastname:'',
    email:'',
    username:'',
    password:'',
    company:'',
    job: '',
    photo: '',

  }
   // declare and initialize the quote property
  // which will be a BehaviorSubject
  user = new BehaviorSubject<User>(this.USER_INIT);

  // expose the BehaviorSubject as an Observable
  currentUser = this.user.asObservable();

  // function to update the value of the BehaviorSubject
  updateUser(newUser: User){
    this.user.next(newUser);
  }
}
