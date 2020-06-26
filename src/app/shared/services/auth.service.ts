import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  public checkUserForUnique(email: string): Observable<any> {
    return this.httpClient.get(this.url + `users?email=${email}`);
  }

  public logIn(data: User): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + `users?email=${data.email}`);
  }

  public signUp(data: User): Observable<User> {
    return this.httpClient.post<User>(this.url + 'users', data);
  }

  public logOut(): void {
    localStorage.setItem('login', 'false');
    this.router.navigate(['login']);
  }

  public isLog(): boolean {
    return localStorage.getItem('login') === 'true';
  }
}
