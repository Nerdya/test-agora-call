import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './views/theme/angular-material.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomeComponent } from './views/pages/welcome/welcome.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { CustomerComponent } from './views/pages/customer/customer.component';
import { AgentComponent } from './views/pages/agent/agent.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        DashboardComponent,
        CustomerComponent,
        AgentComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
