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
  this.todos = [];
  this._todoService.getTodos()
  .subscribe(resTodoData => this.todos = resTodoData);

  }
  addTodo($event,todoText){
  if($event.which === 1){
  var result;
  var newTodo = {
  text: todoText.value,
  isCompleted: false
  };

  result = this._todoService.saveTodos(newTodo);
  result.subscribe(x=> {
  this.todos.push(newTodo)
  todoText.value= "";
  })
  }
  }

  updateStatus(todo){
  var _todo= {
  _id:todo._id,
  text: todo.text,
  isCompleted: !todo.isCompleted
  };
  this._todoService.updateTodo(_todo)
  .subscribe(data => {todo.isCompleted = !todo.isCompleted;
  });
  }
  setEditState(todo, state){
  if(state){
  todo.isEditMode = state;
  }else{
   delete todo.isEditMode;
  }
  }

  updateTodoText($event, todo){
  if($event.which === 13){
  todo.text = $event.target.value;
  var _todo ={
  _id: todo._id,
  text:todo.text,
  isCompleted: todo.isCompleted
  };
  this._todoService.updateTodo(_todo)


  .subscribe(data=>{this.setEditState(todo, false);
  });
  }
  }
  deleteTodo(todo){
    var todos = this.todos;


    this._todoService.deleteTodo(todo._id)

      .subscribe(data => {

          for(var i = 0;i < todos.length;i++){
            if(todos[i].text == todo.text){
              todos.splice(i, 1);
            }
          }

      })
  }
}
