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
    return this.http.get<apiResponse>(this.apiUrl + this.usersUrl).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id);
    return this.http
      .get<apiResponse>(this.apiUrl + this.userUrl, {
        params,
      })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  deleteUser(id: number): Observable<number> {
    const params = new HttpParams().set('id', id);
    return this.http
      .delete<apiResponse>(this.apiUrl + this.userUrl, {
        params,
      })
      .pipe(
        map((response) => {
          if (response.code != 0) {
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

  createUser(newUserData: any): Observable<number> {
    const body = new HttpParams()
      .set('password', newUserData.password)
      .set('name', newUserData.name)
      .set('username', newUserData.username)
      .set('birthday', newUserData.birthday)
      .set('gender', newUserData.gender);

    return this.http
      .post<apiResponse>(this.apiUrl + this.userUrl, body, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          if (response.code != 0) {
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

  updateUser(newUserData: any): Observable<number> {
    const params = new HttpParams()
      .set('id', newUserData.id)
      .set('name', newUserData.name)
      .set('username', newUserData.username)
      .set('birthday', newUserData.birthday)
      .set('gender', newUserData.gender);

    return this.http
      .put<apiResponse>(this.apiUrl + this.userUrl, params, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          if (response.code != 0) {
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
}
