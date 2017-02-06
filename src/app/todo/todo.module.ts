import { AuthGuardService } from './../core/auth-guard.service';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoService } from './todo.service';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoComponent } from './todo.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test2Component } from './test2/test2.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoComponent,
    Test2Component,
    TodoItemComponent,
    TodoListComponent
  ],
  providers: [
    {provide: 'todoService', useClass: TodoService},
  ]
})
export class TodoModule { }

