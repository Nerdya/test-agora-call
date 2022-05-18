import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './views/pages/customer/customer.component';
import { AgentComponent } from './views/pages/agent/agent.component';
import { FlowchartComponent } from './views/pages/flowchart/flowchart.component';

const routes: Routes = [
    { path: 'customer', component: CustomerComponent},
    { path: 'agent', component: AgentComponent},
    { path: 'flowchart', component: FlowchartComponent},
    { path: '', redirectTo: 'customer', pathMatch: 'full'},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule { }
