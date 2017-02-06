import { Router } from '@angular/router';
import { Auth } from './../domain/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-login',
  template: `

    <div>
      <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
        <fieldset ngModelGroup="login">
          <input type="text" name="username" [(ngModel)]="username"
            #usernameRef="ngModel"
            required minlength="3">
            <div *ngIf="usernameRef.errors?.required">this is required</div>
            <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
            <div *ngIf="auth?.hasError">{{auth.errMsg}}</div>
          <input required type="password" name="password" placeholder="请输入密码" [(ngModel)]="password" #passwordRef="ngModel">
            <div *ngIf="passwordRef.errors?.required">this is required</div>
        </fieldset>
          <button type="submit">Login</button>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `]
})
export class LoginComponent implements OnInit {
  username = '请输入用户名';
  password = '';
  auth: Auth;
  constructor( @Inject('auth') private service: AuthService, private router: Router) { }

  ngOnInit() {
  }
  // onClick() {
  // }
  onSubmit(formValue) {
    console.log(this.username, this.password);
    this.service
      // .loginWithCredentials(formValue.Login.username, formValue.login.password)
      .loginWithCredentials(this.username, this.password)
      .then(auth => {
        let redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

}
