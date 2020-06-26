import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  public logOut() {
    this.authService.logOut();
  }

  public isLog() {
    return this.authService.isLog();
  }

}
