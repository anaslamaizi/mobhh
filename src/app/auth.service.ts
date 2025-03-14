import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

const AUTH_API = 'http://localhost:3000/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router, private localStorageService: LocalStorageService) {}

 // isLoggedIn: boolean = false;
  redirectUrl:string = '';

  signup(user:User): Observable<any> {
    const url = AUTH_API
    return this.http.post(
      url,
      user
    );//.pipe(map((result:any)=>result.data[0]));
  }


  login(username: string, password: string): Observable<any> {
    const url = AUTH_API + '?' + 'username=' + username + '&password=' + password;
    return this.http.get(
      url,
      httpOptions
    );//.pipe(map((result:any)=>result.data[0]));
  }

  updateUser(user:User):Observable<any> {
    const url = AUTH_API + '/' + user.id;
    console.log(url);
    return this.http.put(url, user);
  }

 canActivate():boolean {
   return false;
 }

 logout() {
  this.localStorageService.clearData();
  this.router.navigate(['/login']);
 }

 isLoggedIn() {
  return localStorage.getItem('user') !== null;
}
}
