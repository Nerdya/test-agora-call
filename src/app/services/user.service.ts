import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: any) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id: any) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}