import { Component, Input, OnInit } from '@angular/core';
import { RobotData } from "@app/board/interfaces/robot.interface";
import { InitialGameProperties } from "@app/core/enums/initial-properties.enum";

@Component({
  selector: 'rbt-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss']
})
export class LandscapeComponent implements OnInit {

  @Input() squares: null[];
  @Input() robotState: RobotData;
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
