import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    DashboardComponent,
    CustomerComponent,
    AgentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
