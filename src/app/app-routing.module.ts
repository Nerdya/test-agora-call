import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './views/pages/welcome/welcome.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { CustomerComponent } from './views/pages/customer/customer.component';
import { AgentComponent } from './views/pages/agent/agent.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  
export class AppRoutingModule { }
