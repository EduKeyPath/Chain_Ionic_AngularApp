import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap, map } from "rxjs/operators";
import * as moment from 'moment-timezone';
import config from '../config/config';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request =  this.handleBodyIn(request);

        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
        }));
    }


    handleBodyIn(req:HttpRequest<any>) {
        let timezone = localStorage.getItem('timezone');
        if(!!!timezone){
            timezone = moment.tz.guess();
            localStorage.setItem('timezone', timezone);
        }
        let utc_timestamp =  moment().unix();

        if (req.method.toLowerCase() === 'post') {
            if (req.body instanceof FormData) {
                const appVer = config.appVer;
                const params = {
                    ...req.body,
                    utc_timestamp: utc_timestamp,
                    timezone : timezone
                }
                req =  req.clone({
                    body: {...appVer, params}
                })
            } else {
                const appVer = config.appVer;
                const params = {
                    ...req.body,
                    utc_timestamp: utc_timestamp,
                    timezone : timezone
                }
                req =  req.clone({
                    body: {...appVer, params}
                })
            }
        }
        return req;
    }

  
}


