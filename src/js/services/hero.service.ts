import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../models/hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http
            .get(this.heroesUrl)
            .map(this.extractData);
    }

    getHero(id: number): Observable<Hero> {
        return this.getHeroes()
            .map(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    save(hero: Hero): Observable<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero: Hero): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, headers);
    }

    // Add new Hero
    private post(hero: Hero): Observable<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
            .map(this.extractData);
    }

    // Update existing Hero
    private put(hero: Hero): Observable<Hero> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .map(() => hero);
    }

    private extractData(res: Response) {
        return res.json() || [];
    }

}
