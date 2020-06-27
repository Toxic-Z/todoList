import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ToDoItem } from '../interfaces/to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchTodos(): Observable<ToDoItem[]> {
    return this.httpClient.get<ToDoItem[]>(this.url + 'todos');
  }

  public fetchTodoById(id: string): Observable<ToDoItem> {
    return this.httpClient.get<ToDoItem>(this.url + `todos?id=${id}`);
  }

  public createTodo(t: ToDoItem): Observable<ToDoItem> {
    return this.httpClient.post<ToDoItem>(this.url + 'todos', t);
  }

  public updateTodo(t: ToDoItem): Observable<ToDoItem> {
    return this.httpClient.put<ToDoItem>(this.url + `todos/${t.id}`, t);
  }

  public deleteTodo(t: ToDoItem): Observable<ToDoItem> {
    return this.httpClient.delete<ToDoItem>(this.url + `todos/${t.id}`);
  }
}
