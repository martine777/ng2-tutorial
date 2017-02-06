import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from '../domain/entities';
import { TodoService } from './todo.service';
@Component({
  // selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(
    @Inject('todoService') private service: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.getTodos();
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }
  filterTodos(filter: string) {
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }
  onTextChanged(value) {
    this.desc = value;
  }
  addTodo() {
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }
  toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
        return null;
      });
  }
  removeTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service
      .deleteTodoById(todo.id)
      .then(() => {
        if (0 === i) {
          this.todos = [...this.todos.slice(1)];
        } else {
          this.todos = [
            ...this.todos.slice(0, i),
            ...this.todos.slice(i + 1)
          ];
          return null;
        }
      });
  }
  getTodos(): void {
    this.service
      .getTodos()
      .then((todos => {
        this.todos = [...todos];
      }));
  }
  clearCompleted() {
    const todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = [...this.todos.filter(todo => todo.completed === false)];
    Promise.all(todos.map(todo => { this.service.deleteTodoById(todo.id); }));
    this.todos = [...active_todos];
  }
  toggleAll() {
    const _todos = this.todos;
    Promise.all(_todos.map(todo => this.toggleTodo(todo)));
  }

}
