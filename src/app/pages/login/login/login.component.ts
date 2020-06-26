import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/interfaces/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.authService.isLog()) {
      this.router.navigate(['dashboard']);
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public signUp() {
    this.authService.checkUserForUnique(this.form.get('email').value)
      .pipe(
        map(r => !r.length)
      )
      .subscribe((r: boolean) => {
        if (r) {
          const user: User = {
            email: this.form.get('email').value,
            password: btoa(this.form.get('password').value),
            id: Math.random()
          };
          this.authService.signUp(user).subscribe((u: User) => {
            localStorage.setItem('login', 'true');
            this.router.navigate(['dashboard'])
          });
        } else {
          this.openSnackBar('This user exists!', 'Ok');
        }
      });
  }

  public logIn() {
    this.authService.logIn({
      email: this.form.get('email').value,
      password: btoa(this.form.get('password').value)
    }).subscribe((u: User[]) => {
      const isLoggedIn = u.length && atob(u[0].password) === this.form.get('password').value;
      localStorage.setItem('login', isLoggedIn ? 'true' : 'false');
      isLoggedIn ? this.router.navigate(['dashboard']) : this.openSnackBar('Wrong user or password', 'Ok');
    });
  }
}
