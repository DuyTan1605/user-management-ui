import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { User } from '../../types/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler } from '../../utils/error-handlers';
import { apiResponse } from '../../types/apiResponse';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  private apiUrl = environment.apiUrl;
  private usersUrl = '/users';
  private userUrl = '/user';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private ErrorHandler: ErrorHandler
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<any>(this.apiUrl + this.usersUrl, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body.data;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<any>(this.apiUrl + this.userUrl + '?id=' + id, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body.data;
        })
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(this.apiUrl + this.userUrl + '?id=' + id, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.body.code != 0) {
            this.toastr.error(
              'Delete user fail',
              this.ErrorHandler.getErrorMsg(response)
            );
            return 0;
          }
          this.toastr.success('Delele user success!');
          return 1;
        })
      );
  }

  createUser(newUserData: any): Observable<any> {
    const body = new HttpParams()
      .set('password', newUserData.password)
      .set('name', newUserData.name)
      .set('username', newUserData.username)
      .set('birthday', newUserData.birthday)
      .set('gender', newUserData.gender);

    return this.http
      .post<any>(this.apiUrl + this.userUrl, body, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.body.code != 0) {
            this.toastr.error(
              'Create user fail',
              this.ErrorHandler.getErrorMsg(response)
            );
            return 0;
          }
          this.toastr.success('Create user success!');
          return 1;
        })
      );
  }

  updateUser(newUserData: any): Observable<any> {
    const params = new HttpParams()
      .set('id', newUserData.id)
      .set('name', newUserData.name)
      .set('username', newUserData.username)
      .set('birthday', newUserData.birthday)
      .set('gender', newUserData.gender);

    return this.http
      .put<any>(this.apiUrl + this.userUrl, params, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.body.code != 0) {
            this.toastr.error(
              'Update user fail',
              this.ErrorHandler.getErrorMsg(response)
            );
            return 0;
          }
          this.toastr.success('Update user success!');
          return 1;
        })
      );
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //     this.toastr.error(this.ErrorHandler.getErrorMsg(error));
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
