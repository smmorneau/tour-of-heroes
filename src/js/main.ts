// The usual bootstrapping imports
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './components/app.component';
import { APP_ROUTER_PROVIDERS } from './routes/app.routes';

document.addEventListener("DOMContentLoaded", function(event) {
    // TODO: register HTTP_PROVIDERS in AppComponent providers
    bootstrap(AppComponent, [
        APP_ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
    ])
      .catch(err => console.error(err));
});
