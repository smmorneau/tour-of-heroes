import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }     from '../services/hero.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
    ],
    selector: 'my-app',
    styleUrls: ['dist/css/component/app.component.css'],
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
})

@RouteConfig([
    {
        component: DashboardComponent,
        name: 'Dashboard',
        path: '/dashboard',
        useAsDefault: true,
    },
    {
        component: HeroDetailComponent,
        name: 'HeroDetail',
        path: '/detail/:id',
    },
    {
        component: HeroesComponent,
        name: 'Heroes',
        path: '/heroes',
    },
])

export class AppComponent {
    title = 'Tour of Heroes';
}
