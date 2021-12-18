import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BoardComponent } from "./board.component";
import { LandscapeComponent } from "./components/landscape/landscape.component";
import { SquareComponent } from "./components/square/square.component";
import { PlayerPanelComponent } from "./components/player-panel/player-panel.component";
import { BoardService } from "./services/board.service";

@NgModule({
  declarations: [
    BoardComponent,
    LandscapeComponent,
    SquareComponent,
    PlayerPanelComponent
  ],
  imports: [CommonModule],
  exports: [
    BoardComponent
  ],
  providers: [BoardService]
})
export class BoardModule { }
