import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CallService {

    constructor(private http: HttpClient) {
    }

    login(url: any, body: any, options: any): Observable<any> {
        return this.http.post(url + '/auth/login', body, options).pipe(
            map(res => {
                return res;
            })
        );
    }

    callinit(url: any, options: any): Observable<any> {
        return this.http.get(url + '/call/init', options).pipe(
            map(res => {
                return res;
            })
        );
    }

    calljoin(url: any, options: any): Observable<any> {
        return this.http.get(url + '/call/join', options).pipe(
            map(res => {
                return res;
            })
        );
    }
    
}
