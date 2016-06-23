import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../services/hero.service';
import { htmlTemplate } from '../templates/heroes.html';

@Component({
    directives: [HeroDetailComponent],
    selector: 'my-heroes',
    styleUrls: ['dist/css/component/heroes.component.css'],
    template: htmlTemplate,
})

export class HeroesListComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    error: any;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes() {
        this.heroService
            .getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error => this.error = error // TODO: Display error message
            );
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    delete(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .subscribe(
                res => this.heroes = this.heroes.filter(h => h.id !== hero.id),
                error => this.error = error // TODO: Display error message
            );
    }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    gotoDetail() {
        this.router.navigate(['/detail/:id', { id: this.selectedHero.id }]);
    }
}
