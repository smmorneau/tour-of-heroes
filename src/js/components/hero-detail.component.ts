import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { htmlTemplate } from '../templates/hero-detail.html';

@Component({
    selector: 'my-hero-detail',
    styleUrls: ['dist/css/component/hero-detail.component.css'],
    template: htmlTemplate,
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        if (this._routeParams.get('id') !== null) {
            let id = +this._routeParams.get('id');
            this.navigated = true;
            this._heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this._heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        // TODO: use the routerCanDeactivate hook
        if (this.navigated) { window.history.back(); }
    }

}
