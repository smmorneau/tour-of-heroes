// Imports for loading & configuring the in-memory web api
import { provide }    from '@angular/core';
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api/core';
import { InMemoryDataService }               from './services/in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './components/app.component';

document.addEventListener("DOMContentLoaded", function(event) {
    // TODO: register HTTP_PROVIDERS in AppComponent providers
    bootstrap(AppComponent, [
        HTTP_PROVIDERS,
        provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
        provide(SEED_DATA,  { useClass: InMemoryDataService }),    // in-mem server data
    ]);
});
