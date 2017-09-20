import { Component, OnInit } from '@angular/core';
import { Todo } from './../todo';
import { TodoService} from '../todo/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [ TodoService ]
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private _todoService: TodoService) { }

  ngOnInit() {
  this._todoService.getTodos()
  .subscribe(resTodoData => this.todos = resTodoData);

  }

}
