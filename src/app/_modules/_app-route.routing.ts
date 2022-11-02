import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../_components/_contents/_ts/_home';
import { MasterListComponent } from '../_components/_contents/_ts/_masterlist';
import { PlacementComponent } from '../_components/_contents/_ts/_placement';
import { SupervisorsComponent } from '../_components/_contents/_ts/_supervisors';
import { RoutesComponent } from '../_components/_contents/_ts/_routes';
import { SettingsComponent } from '../_components/_contents/_ts/_settings';
import { LoginComponent } from '../_components/_contents/_ts/_login';
import { AuthGuard } from '../_guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `login`},
  { path: `login`, component: LoginComponent},
  { path: `home.js`, component: HomeComponent,canActivate: [AuthGuard]},
  { path: `master-list.js`, component: MasterListComponent,canActivate: [AuthGuard]},
  { path: `placement.js`, component: PlacementComponent,canActivate: [AuthGuard]},
  { path: `supervisors.js`, component: SupervisorsComponent,canActivate: [AuthGuard]},
  { path: `routes.js`, component: RoutesComponent,canActivate: [AuthGuard]},
  { path: `settings.js`, component: SettingsComponent,canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: `login` }
];

export const AppRoutingModule = RouterModule.forRoot(routes);//LoginComponent
