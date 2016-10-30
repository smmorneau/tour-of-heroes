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
        private heroService: HeroService
    ) {
        console.log('DashboardComponent');
    }

    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(heroes => {
                this.heroes = heroes.slice(1, 5);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.getHeroes();
    }
}
