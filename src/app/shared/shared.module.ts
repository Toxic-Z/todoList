import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Page404Component } from './components/page404/page404.component';
import {MatButtonModule} from '@angular/material/button';
import { TodoCrudComponent } from './components/todo-crud/todo-crud.component';



@NgModule({
  declarations: [HeaderComponent, Page404Component, TodoCrudComponent],
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
