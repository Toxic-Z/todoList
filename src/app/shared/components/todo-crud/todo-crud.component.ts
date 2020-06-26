import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-crud',
  templateUrl: './todo-crud.component.html',
  styleUrls: ['./todo-crud.component.scss']
})
export class TodoCrudComponent implements OnInit {
  form: FormGroup;
  constructor(
    private route: ActivatedRoute
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
          Validators.maxLength(30)
        ])
      });
    } else {

    }
  }

  ngOnInit(): void {
  }

}
