import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'test-agora-call';
    routes = [
        {
            path: '/customer',
            title: 'Customer'
        },
        {
            path: '/agent',
            title: 'Agent'
        },
        {
            path: '/flowchart',
            title: 'Flowchart'
        },
    ];

    constructor(
        private router: Router
    ) {
    }

    getUrl() {
        return this.router.url;
    }

}
