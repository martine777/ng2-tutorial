import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, Response } from '@angular/http';
import { Auth } from '../domain/entities';
@Injectable()
export class AuthService {

  constructor(private http: Http, @Inject('user') private userService) { }
  loginWithCredentials(username, password): Promise<Auth> {
    return this.userService
      .findUser(username)
      .then(user => {
        let auth = new Auth();
        localStorage.removeItem('userId');
        let redirectUrl = (localStorage.getItem('redirectUrl') === null) ? '/todo' : localStorage.getItem('redirectUrl');
        auth.redirectUrl = redirectUrl;
        if (null === user) {
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId', user.id);
        } else {
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }

        return auth;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
