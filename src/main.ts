import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from './app/services/data.service';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers,
    DataService, provideAnimationsAsync(), provideAnimationsAsync()
  ]
})
  .catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));
 