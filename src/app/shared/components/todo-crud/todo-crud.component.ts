import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToDoItem } from '../../interfaces/to-do-item';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-crud',
  templateUrl: './todo-crud.component.html',
  styleUrls: ['./todo-crud.component.scss']
})
export class TodoCrudComponent implements OnInit {
  public form: FormGroup;
  public currTodo: ToDoItem;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ])
      });
    } else {
      this.apiService.fetchTodoById(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe((t: ToDoItem) => {
        this.currTodo = t;
        this.form = new FormGroup({
          name: new FormControl(t[0].name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ]),
          description: new FormControl(t[0].description, [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
          ])
        });
      });
    }
  }

  ngOnInit(): void {
  }

  public toDashboard() {
    this.router.navigate(['dashboard']);
  }

  public saveTodo() {
    const todo: ToDoItem = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      id: this.route.snapshot.paramMap.get('id') === 'new' ? '' : this.currTodo.id,
      createdAt: this.route.snapshot.paramMap.get('id') === 'new' ? moment(new Date()).format('YYYY-MM-DD HH:mm') : this.currTodo.createdAt,
      editedAt: moment(new Date()).format('YYYY-MM-DD HH:mm')
    };
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.apiService.createTodo(todo).subscribe((t: ToDoItem) => {
        this.router.navigate(['dashboard']);
      });
    } else {
      this.apiService.updateTodo(todo).subscribe((t: ToDoItem) => {
        console.log(t)
      });
    }
  }

}
