import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
