import './vendor';

import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';

import { AppRoutingModule }    from './app-routing.module';
import { AppComponent }        from './components/app.component';
import { DashboardComponent }  from './components/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { HeroesListComponent } from './components/hero-list.component';
import { HeroSearchComponent } from './components/hero-search.component';
import { HeroService }         from './services/hero.service';

// uncomment to add bootstrap
// require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../scss/main.global.scss');
require('../scss/nav.global.scss');


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesListComponent,
        HeroSearchComponent,
    ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
  ],
  providers: [
      HeroService,
  ],
})
export class AppModule { }
