import { User } from '../model/user.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class SessionService {
  private defaultHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
  private defaultOptions: RequestOptions = new RequestOptions({
    headers: this.defaultHeaders,
    withCredentials: true
  });

  private endpoint = `${environment.api}/session`;
  user: User;
  private userSubject = new Subject<User>();

  user$ = this.userSubject.asObservable();

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  }

  create(user: User): Observable<User> {
    return this.http.post(`${this.endpoint}/create`, JSON.stringify(user), this.defaultOptions)
      .map(res => this.doAuthentication(res.json()))
      .catch(this.handleError);
  }

  signup(user: User): any {
    return this.http.post(`${this.endpoint}/signup`, JSON.stringify(user), this.defaultOptions)
      .map(res => res.json())
      .catch(this.handleError);
  }

  destroy(): Observable<void> {
    return this.http.delete(this.endpoint, this.defaultOptions)
      .map((res) => {
        this.user = null;
        this.userSubject.next(this.user);

        localStorage.removeItem(CURRENT_USER_KEY);
      })
      .catch (this.handleError);
  }

  private doAuthentication(user: User): User {
    this.user = user;

    this.userSubject.next(this.user);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.user));

    return this.user;
  }

  protected handleError(error: Response | any): Observable<any> {
    if (!environment.production) {
      console.error(`Phone Service error: ${error.json()}`);
    }

    return Observable.throw(error.json());
  }

}
