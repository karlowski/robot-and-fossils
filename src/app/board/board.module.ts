import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BoardComponent } from "./board.component";
import { LandscapeComponent } from "./components/landscape/landscape.component";
import { SquareComponent } from "./components/square/square.component";
import { PlayerPanelComponent } from "./components/player-panel/player-panel.component";
import { TimingPipe } from './pipes/timing.pipe';

@NgModule({
  declarations: [
    BoardComponent,
    LandscapeComponent,
    SquareComponent,
    PlayerPanelComponent,
    TimingPipe
  ],
  imports: [CommonModule],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
