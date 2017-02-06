import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { TestComponent } from './test/test.component';
export let tmpFun = function (base_url): string {
  return 'hehe' + base_url;
};
export function tmpFun2(base_url): string {
  return 'hehe' + base_url;
};

export function helloFactory(take: number) {
  return tmpFun2;
};
console.log(typeof tmpFun);
console.log(typeof tmpFun2);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    AppRoutingModule,
    TodoModule,
    CoreModule 
  ],
  providers: [
    // { provide: 'auth', useClass: AuthService },
    { provide: 'BASE_URL', useValue: 'http://localhost:4200' },
    { provide: 'factory', useFactory: helloFactory(1), deps: ['BASE_URL'] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
