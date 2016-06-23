import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { htmlTemplate } from '../templates/hero-detail.html';

@Component({
    selector: 'my-hero-detail',
    styleUrls: ['dist/css/component/hero-detail.component.css'],
    template: htmlTemplate,
})

export class HeroDetailComponent implements OnInit, OnDestroy {
    hero: Hero;
    error: any;
    private sub: any;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params
            .subscribe((params: any) => {
                let id = +params.id; // (+) converts string 'id' to a number
                if (id) {
                    this.heroService.getHero(id)
                        .subscribe(hero => this.hero = hero);
                } else {
                    this.hero = new Hero();
                }
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {
        this.heroService
            .save(this.hero)
            .subscribe(
                hero => {
                    this.hero = hero; // saved hero, w/ id if new
                    this.gotoHeroes();
                },
                error => this.error = error  // TODO: Display error message
            );
    }

    gotoHeroes() {
        let heroId = this.hero ? this.hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        this.router.navigate(['/heroes'], { queryParams: { id: heroId } });
    }

}
