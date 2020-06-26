import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { ToDoItem } from '../../../shared/interfaces/to-do-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todos: Observable<ToDoItem[]>;
  displayedColumns: string[] = ['position', 'name', 'createdAt', 'editedAt', 'buttons'];
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.todos = this.apiService.fetchTodos();
  }


  ngOnInit(): void {
  }

  public toNewTodo() {
    this.router.navigate(['todo/new']);
  }

}
