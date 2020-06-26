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
}
