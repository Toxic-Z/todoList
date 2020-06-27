import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { ToDoItem } from '../../../shared/interfaces/to-do-item';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  todos: Observable<ToDoItem[]>;
  displayedColumns: string[] = ['position', 'name', 'createdAt', 'editedAt', 'buttons'];
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.updateTodos();
  }

  ngOnInit(): void {
  }

  public updateTodos(): void {
    this.todos = this.apiService.fetchTodos();
  }

  public toCrudPage(t: ToDoItem): void {
    this.router.navigate([`todo/${t.id}`]);
  }

  public toNewTodo(): void {
    this.router.navigate(['todo/new']);
  }

  public deleteTodo(todo: ToDoItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
      data: {type: 'delete'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteTodo(todo).subscribe((t: ToDoItem) => {
          this.updateTodos();
        });
      }
    });
  }
}
