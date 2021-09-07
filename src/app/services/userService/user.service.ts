import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../types/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = "http://localhost:8080";
  private usersUrl = '/users';
  private userUrl = "/user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl+this.usersUrl).pipe(
      map((res) => res.data),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUser(id:number):Observable<User>{
    return this.http.get<any>(this.apiUrl+this.userUrl+"?id="+id).pipe(
      map((res) => res.data),
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