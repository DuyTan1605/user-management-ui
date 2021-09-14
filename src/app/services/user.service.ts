import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../entities/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.dev';

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

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl + this.usersUrl, { observe: 'events' })
      .pipe(
        map((response: any) => {
          return response?.data;
        })
      );
  }

  getUser(id: number): Observable<User> {
    const params = new HttpParams().set('id', id);
    return this.http
      .get<User>(this.apiUrl + this.userUrl, {
        params,
        observe: 'events',
      })
      .pipe(
        map((response: any) => {
          return response?.data;
        })
      );
  }

  deleteUser(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http
      .delete<any>(this.apiUrl + this.userUrl, {
        params,
        observe: 'events',
      })
      .pipe(
        map((response: any) => {
          return response?.code == 0 ? 1 : 0;
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
        observe: 'events',
      })
      .pipe(
        map((response: any) => {
          return response?.code == 0 ? 1 : 0;
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
        observe: 'events',
      })
      .pipe(
        map((response: any) => {
          return response?.code == 0 ? 1 : 0;
        })
      );
  }
}
