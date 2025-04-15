import { Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ObjetoWindowComponent } from './pages/objeto-window/objeto-window.component';
import { TooltipComponent } from './pages/tooltip/tooltip.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'objwin', component: ObjetoWindowComponent },
    { path: 'popover', component: TooltipComponent },
    { path: '**', redirectTo: '' },
];
