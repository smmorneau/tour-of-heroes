import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../models/hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http
            .get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        return this.getHeroes()
            .map(heroes => {
                console.log('HEROES', heroes);
                return heroes.filter(hero => hero.id === id)[0];
            });
    }

    create(name: string): Observable<Hero> {
        return this.http
          .post(this.heroesUrl, JSON.stringify({name: name}), this.options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    update(hero: Hero): Observable<Hero>  {
        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
          .put(url, JSON.stringify(hero), this.options)
          .map(() => hero);
    }

    delete(hero: Hero): Observable<Response> {
        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, this.options);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError (error: Response | any) {
        console.log('HANDLE ERROR');
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
