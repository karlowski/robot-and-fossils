import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandscapeComponent } from './board/components/landscape/landscape.component';
import { PlayerPanelComponent } from './board/components/player-panel/player-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LandscapeComponent,
    PlayerPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
