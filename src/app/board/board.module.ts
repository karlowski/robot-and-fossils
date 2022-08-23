import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BoardComponent } from "./board.component";
import { SquareComponent } from "./components/square/square.component";
import { PlayerPanelComponent } from "./components/player-panel/player-panel.component";
import { TimerPipe } from './pipes/timer.pipe';
import { ScorePanelComponent } from './components/score-panel/score-panel.component';

@NgModule({
  declarations: [
    BoardComponent,
    SquareComponent,
    PlayerPanelComponent,
    TimerPipe,
    ScorePanelComponent
  ],
  imports: [CommonModule],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
