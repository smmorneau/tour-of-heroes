import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

const bootstrap = () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error('bootstrapModule Error:', err));
};

switch (document.readyState) {
    case 'complete':
    case 'interactive':
    case 'loaded':
        bootstrap();
        break;
    default:
        document.addEventListener('DOMContentLoaded', bootstrap);
        break;
}
