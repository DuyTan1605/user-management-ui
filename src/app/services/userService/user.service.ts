import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../types/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  private apiUrl = environment.apiUrl;
  private usersUrl = '/users';
  private userUrl = '/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl + this.usersUrl).pipe(
      map((res) => res.data),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(this.apiUrl + this.userUrl + '?id=' + id).pipe(
      map((res) => res.data),
      catchError(this.handleError<User>('getUser', undefined))
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + this.userUrl + '?id=' + id).pipe(
      map((res) => res),
      catchError(this.handleError<User>('getUser', undefined))
    );
  }

  createUser(newUserData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + this.userUrl, newUserData, this.httpOptions)
      .pipe(
        map((res) => res),
        catchError(this.handleError<User>('getUser', undefined))
      );
  }

  updateUser(newUserData: any): Observable<any> {
    return this.http
      .put<any>(this.apiUrl + this.userUrl, newUserData, this.httpOptions)
      .pipe(
        map((res) => res),
        catchError(this.handleError<User>('getUser', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
