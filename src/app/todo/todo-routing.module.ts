import { AuthGuardService } from './../core/auth-guard.service';
import { AuthService } from './../core/auth.service';
import { Test2Component } from './test2/test2.component';
import { TodoComponent } from './todo.component';
import { Todo } from '../domain/entities';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService],
    component: TodoComponent
  },
  {
    path: 'todo/test2',
    component: Test2Component
  },
  // {
  //   path: '',
  //   redirectTo: 'test2',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TodoRoutingModule { }
