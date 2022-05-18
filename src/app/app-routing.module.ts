import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './views/pages/customer/customer.component';
import { AgentComponent } from './views/pages/agent/agent.component';

const routes: Routes = [
    { path: 'customer', component: CustomerComponent},
    { path: 'agent', component: AgentComponent},
    { path: '', redirectTo: 'customer', pathMatch: 'full'},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule { }
