import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Todo } from '../domain/entities';
import { UUID } from 'angular2-uuid';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class TodoService {
  // private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // private userId: number;
  constructor(private http: Http) { }
  filterTodos(filter: string): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    switch (filter) {
      case 'ACTIVE':
        return this.http
          .get(`${this.api_url}?completed=false&userId=${userId}`)
          .toPromise()
          .then(res => res.json() as Todo[])
          .catch(this.handleError);
      case 'COMPLETED':
        return this.http
          .get(`${this.api_url}?completed=true&userId=${userId}`)
          .toPromise()
          .then(res => res.json() as Todo[])
          .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }
  addTodo(desc: string): Promise<Todo> {
    const userId: number = +localStorage.getItem('userId');
    let todo: Todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: userId
    };
    // this.todos.push(todo);
    // return this.todos;
    return this.http
      .post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Todo)
      .catch(this.handleError);
    // .toPromise()
    // .then()
  }
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    //使用http.patch(url,json,header)方法可以减少数据流量
    return this.http.put(url, JSON.stringify(updatedTodo), { headers: this.headers })
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  getTodos(): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json() as Todo[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
