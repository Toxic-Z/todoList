import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  private checkUserForUnique(email: string): Observable<any> {
    return this.httpClient.get(this.url + `users?email=${email}`);
  }

  public logIn(data: User): any {
    return this.httpClient.get(this.url + `users?email=${data.email}`).subscribe((u: User) => {
      const isLoggedIn = u && atob(u[0].password) === atob(data.password);
      localStorage.setItem('login', isLoggedIn ? 'true' : 'false');
    });
  }

  public signUp(data: User): void {
    this.checkUserForUnique(data.email)
      .pipe(
        map(r => !r.length)
      )
      .subscribe((r: boolean) => {
        if (r) {
          const user: User = {...data};
          user.id = Math.random();
          this.httpClient.post(this.url + 'users', data).subscribe();
          localStorage.setItem('login', 'true');
        }
    });
  }

  public logOut(): void {
    localStorage.setItem('login', 'false');
    this.router.navigate(['login']);
  }

  public isLog(): boolean {
    const res = localStorage.getItem('login');
    return res === 'true';
  }
}
