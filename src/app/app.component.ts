import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'face-mask-detection';
    currentUser!: User;
    routes = [
        {
            path: '/welcome',
            title: 'Welcome'
        },
        {
            path: '/dashboard',
            title: 'Dashboard'
        },
        {
            path: '/customer',
            title: 'Customer'
        },
        {
            path: '/agent',
            title: 'Agent'
        },
    ];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    isNotAuthRoute() {
        if (this.router.url.includes('/auth')) {
            return false;
        }
        return true;
    }

    getUrl() {
        return this.router.url;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
