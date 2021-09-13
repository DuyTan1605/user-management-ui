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
import { apiResponse } from '../types/apiResponse';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler } from '../utils/error-handlers';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private ErrorHandler: ErrorHandler
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Retry on failure
      retry(2),
      map((event: HttpEvent<any>): any => {
        if (event instanceof HttpResponse) {
          const myApiResponse: apiResponse = event.body;
          if (myApiResponse.code != 0) {
            this.toastr.error(this.ErrorHandler.getErrorMsg(event));
          }
          return event;
        }
      }),
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        // TODO: Add error handling logic here
        return throwError(error);
      }),

      // PROFILING
      finalize(() => {
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
        console.log(profilingMsg);
      })
    );
  }
}
