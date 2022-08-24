import { Component, Input, OnInit } from '@angular/core';
import { GameData } from "@app/board/interfaces/board.interface";
import { InitialGameProperties } from "@app/core/enums/initial-properties.enum";

@Component({
  selector: 'rbt-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss']
})
export class LandscapeComponent implements OnInit {

  @Input() squares: null[];
  @Input() robotState: GameData;
  @Input() fossilPosition: number | null;

  robotSpriteUrl: string;
  fossilSpriteUrl: string;

  constructor() {
    this.robotSpriteUrl = InitialGameProperties.RobotSprite;
    this.fossilSpriteUrl = InitialGameProperties.FossilSprite;
  }

  ngOnInit(): void {
  }

}
