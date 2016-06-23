import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { htmlTemplate } from '../templates/dashboard.html';

@Component({
    selector: 'my-dashboard',
    styleUrls: ['dist/css/component/dashboard.component.css'],
    template: htmlTemplate,
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(heroes => {
                this.heroes = heroes.slice(1, 5);
            });
    }

    gotoDetail(hero: Hero) {
        this.router.navigate(['/detail/:id', { id: hero.id }]);
    }

    ngOnInit() {
        this.getHeroes();
    }
}
