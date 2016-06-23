import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService } from '../services/hero.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService,
    ],
    selector: 'my-app',
    styleUrls: ['dist/css/component/app.component.css'],
    template: `
        <h1>{{title}}</h1>
        <nav>
            <!--<a [routerLink]="['/crisis-center']">Crisis Center</a>-->
            <!--<a [routerLink]="['/dashboard']">Dashboard</a>-->
            <a [routerLink]="['/heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'Tour of Heroes';
}
