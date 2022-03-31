import { Component, Input, OnInit } from '@angular/core';
import { GameProperties } from "@app/core/models/initial-properties.enum";
import { RobotService } from '@app/core/services/robot.service';
import { Observable } from 'rxjs';

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

  robotPosition$: Observable<number>;
  robotDirection$: Observable<string>;

  constructor(
    private robotService: RobotService
  ) {
    this.robotPosition$ = this.robotService.position$;
    this.robotDirection$ = this.robotService.direction$;
  }

  ngOnInit(): void {
  }

  checkRobotPosition(square: number, position: number): boolean {
    return square === position;
  }

  checkFossilPosition(square: number, position: number): boolean {
    return square === position;
  }

}
