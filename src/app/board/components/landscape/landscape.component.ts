import { Component, Input, OnInit } from '@angular/core';
import { GameProperties } from "@app/core/models/initial-properties.enum";

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss']
})
export class LandscapeComponent implements OnInit {

  @Input() squares: any[] | undefined;
  @Input() robotPosition: number = GameProperties.initialRobotLocation;
  @Input() robotSprite: string = '';
  @Input() fossilSprite: string = '';
  @Input() fossilPosition: number = GameProperties.initialFossilLocation;

  constructor() { }

  ngOnInit(): void {
  }

  checkRobotPosition(square: number, position: number): boolean {
    return square === position;
  }

  checkFossilPosition(square: number, position: number): boolean {
    return square === position;
  }

}
