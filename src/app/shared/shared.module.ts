import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Page404Component } from './components/page404/page404.component';



@NgModule({
  declarations: [HeaderComponent, Page404Component],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
