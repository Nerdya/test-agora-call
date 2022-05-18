import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './views/theme/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        CustomerComponent,
        AgentComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
