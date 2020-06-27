import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToDoItem } from '../../interfaces/to-do-item';
import * as moment from 'moment';
import { CommonService } from '../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    private apiService: ApiService,
    private commonService: CommonService,
    public dialog: MatDialog
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
      this.apiService.fetchTodoById(this.route.snapshot.paramMap.get('id')).subscribe((t: ToDoItem) => {
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

  public toDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  public saveTodo(): void {
    const todo: ToDoItem = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      id: this.route.snapshot.paramMap.get('id') === 'new' ? this.commonService.getRandomInt(1, 500) : this.currTodo[0].id,
      createdAt: this.route.snapshot.paramMap.get('id') === 'new' ?
        moment(new Date()).format('YYYY-MM-DD HH:mm') : this.currTodo[0].createdAt,
      editedAt: moment(new Date()).format('YYYY-MM-DD HH:mm')
    };
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.apiService.createTodo(todo).subscribe((t: ToDoItem) => {
        this.router.navigate(['dashboard']);
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        height: '200px',
        data: {type: 'edit'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.apiService.updateTodo(todo).subscribe((t: ToDoItem) => {
            this.router.navigate(['dashboard']);
          });
        }
      });
    }
  }

  public deleteTodo(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
      data: {type: 'delete'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteTodo(this.currTodo[0]).subscribe((t: ToDoItem) => {
          this.router.navigate(['dashboard']);
        });
      }
    });
  }
}
