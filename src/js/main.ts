import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

document.addEventListener("DOMContentLoaded", function(event) {
    platformBrowserDynamic().bootstrapModule(AppModule);
});
