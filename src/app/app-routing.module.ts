import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoCrudComponent } from './shared/components/todo-crud/todo-crud.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix' },
  { path: 'todo/:id', component: TodoCrudComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
