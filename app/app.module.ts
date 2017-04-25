import { NgModule }       from "@angular/core";
import { BrowserModule }  from '@angular/platform-browser';
import { YoutubePlayerModule } from "ng2-youtube-player";
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        YoutubePlayerModule
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppModule { }
