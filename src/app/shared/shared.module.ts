import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Page404Component } from './components/page404/page404.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [HeaderComponent, Page404Component],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule
    ]
})
export class SharedModule { }
