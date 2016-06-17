import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

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
            .then(heroes => {
                this.heroes = heroes.slice(1, 5);
            });
    }

    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.getHeroes();
    }
}
