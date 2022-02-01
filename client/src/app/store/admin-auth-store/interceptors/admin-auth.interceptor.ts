import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { select, Store } from '@ngrx/store';
import { getAccessToken } from '../store/admin-auth.selectors';
import { catchError, first } from 'rxjs/operators';
import { flatMap } from 'rxjs/internal/operators';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      flatMap((token) => {
        const authRequest = token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          : request;

        return next.handle(authRequest).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log('Redirect');
                return EMPTY;
              }
            }

            throw err;
          })
        );
      })
    );
  }
}
