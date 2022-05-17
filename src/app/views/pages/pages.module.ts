import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [
    CustomerComponent,
    AgentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
