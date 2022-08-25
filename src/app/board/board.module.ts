import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BoardComponent } from "./board.component";
import { SquareComponent } from "./components/landscape/square/square.component";
import { ControlsPanelComponent } from "./components/controls-panel/controls-panel.component";
import { TimerPipe } from './pipes/timer.pipe';
import { ScorePanelComponent } from './components/score-panel/score-panel.component';
import { LandscapeComponent } from './components/landscape/landscape.component';
import { GameOverComponent } from './components/game-over/game-over.component';

@NgModule({
  declarations: [
    BoardComponent,
    SquareComponent,
    ControlsPanelComponent,
    TimerPipe,
    ScorePanelComponent,
    LandscapeComponent,
    GameOverComponent
  ],
  imports: [CommonModule],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
