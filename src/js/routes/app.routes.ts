import { provideRouter, RouterConfig } from '@angular/router';

import { DashboardComponent } from '../components/dashboard.component';
import { HeroesListComponent } from '../components/heroes-list.component';
import { HeroDetailComponent } from '../components/hero-detail.component';


export const routes: RouterConfig = [
  // { path: 'crisis-center', component: CrisisCenterComponent },
  {
    component: DashboardComponent,
    path: '',
  },
  {
    component: HeroDetailComponent,
    path: 'detail/:id',
  },
  {
    component: HeroesListComponent,
    path: 'heroes',
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
