import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, finalize, retry, map } from 'rxjs/operators';
import { ApiResponse } from '../entities/ApiResponse';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  private statusCodes: { [key: number]: any } = {
    401: {
      message: 'Do not have permission',
    },
    500: {
      message: 'Server error',
    },
    503: {
      message: 'Server not avaiable',
    },
  };

  getErrorMsg(response: any) {
    let errorMsg = 'Error';

    if (response.body && response.body.data) {
      errorMsg = response.body.data;
    } else if (this.statusCodes[response.status]) {
      errorMsg = this.statusCodes[response.status].message;
    } else if (response.error && response.statusText) {
      errorMsg = response.statusText;
    }

    return errorMsg;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      map((event: HttpEvent<any>): any => {
        if (event instanceof HttpResponse) {
          console.log(event);
          const myApiResponse: ApiResponse = event.body;
          if (myApiResponse.code != 0) {
            this.toastr.error(this.getErrorMsg(event));
          }
          return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(this.getErrorMsg(error));
        return throwError(error);
      }),
      finalize(() => {
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
        console.log(profilingMsg);
      })
    );
  }
}
