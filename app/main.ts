import { enableProdMode }        from "@angular/core";
import "rxjs/Rx";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule).catch((err: any) => console.error(err));
