import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { GameService } from '../core/services/game.service';
import { RobotData } from './interfaces/robot.interface';
import { InitialGameProperties } from '../core/enums/initial-properties.enum';

@Component({
  selector: 'rbt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  robotPosition$: Observable<number>;
  robotDirection$: Observable<string>;
  fossilPosition$: Observable<number>;
  gameData$: Observable<RobotData>;

  fossilPosition: number = 0;
  squares: null[];

  robotSpriteUrl: string;
  fossilSpriteUrl: string;

  constructor(
    private gameService: GameService
  ) {
    this.gameService.resetFossil();
    this.squares = new Array(25);
    this.robotSpriteUrl = InitialGameProperties.RobotSprite;
    this.fossilSpriteUrl = InitialGameProperties.FossilSprite;

    this.robotPosition$ = this.gameService.robotLocation;
    this.robotDirection$ = this.gameService.robotDirection;
    this.fossilPosition$ = this.gameService.fossilLocation.pipe(
      tap(position => this.fossilPosition = position)
    );

    this.gameData$ = combineLatest([
      this.robotPosition$,
      this.robotDirection$
    ]).pipe(
      map(gameData => {
        const [position, direction] = gameData;

        if (position === this.fossilPosition) {
          this.gameService.updateScore();
          this.gameService.resetFossil(position);
        }

        return {
          position,
          direction,
        };
      }),
      // tap(data => console.log(data))
    )
  }

  ngOnInit(): void { }

  get timeLeft(): Observable<number> {
    return this.gameService.timeLeft$;
  }

  get score(): Observable<number> {
    return this.gameService.score$;
  }

  get isGameOn(): boolean {
    return this.gameService.isGameRunning;
  }

  get isGameOver(): boolean {
    return this.gameService.isGameOver;
  }

  onTurnLeft(direction: any): void {
    this.gameService.updateRobotDirection(direction);
  }

  onMove(direction: any, position: number): void {
    this.gameService.updateRobotLocation(direction, position);
  }

  onTurnRight(direction: any): void {
    const isTurnedRight = true;
    this.gameService.updateRobotDirection(direction, isTurnedRight);
  }

  start(): void {
    this.gameService.startNewRound();
  }

}
