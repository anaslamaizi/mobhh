import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new BehaviorSubject<User | null>(null);
  
  constructor() { 
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'user') {
      this.storageSubject.next(this.getUser());
    }
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser():User | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }
    return JSON.parse(user) as User;
  }

  public removeUser() {
    localStorage.removeItem('user');
  }

  public clearData() {
    localStorage.clear();
  }

  storageChanges$ = this.storageSubject.asObservable();

}
