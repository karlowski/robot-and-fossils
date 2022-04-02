import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { GameService } from '../core/services/game.service';
import { IGameData } from './interfaces/board.interface';
import { GameProperties } from '@app/core/models/initial-properties.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  robotPosition$: Observable<number>;
  robotDirection$: Observable<string>;
  fossilPosition$: Observable<number>;
  mainGameData$: Observable<IGameData>;

  fossilPosition: number = 0;
  squares: null[];

  robotSpriteUrl: string;
  fossilSpriteUrl: string;

  constructor(
    private gameService: GameService
  ) {
    this.gameService.randomizeRobotEmplacement();
    this.gameService.updateFossil();
    this.squares = new Array(25);
    this.robotSpriteUrl = GameProperties.robotSprite;
    this.fossilSpriteUrl = GameProperties.fossilSprite;

    this.robotPosition$ = this.gameService.robotLocation;
    this.robotDirection$ = this.gameService.robotDirection;
    this.fossilPosition$ = this.gameService.fossilLocation.pipe(
      tap(position => this.fossilPosition = position)
    );

    this.mainGameData$ = combineLatest([
      this.robotPosition$,
      this.robotDirection$
    ]).pipe(
      map(gameData => {
        const [robotPosition, robotDirection] = gameData;

        if (robotPosition === this.fossilPosition) {
          this.gameService.updateScore();
          this.gameService.updateFossil(robotPosition);
        }
        
        return {
          robotPosition,
          robotDirection,
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

  onMove(direction: any): void {
    this.gameService.updateRobotLocation(direction);
  }

  onTurnRight(direction: any): void {
    const isTurnedRight = true;

    this.gameService.updateRobotDirection(direction, isTurnedRight);
  }

  start(): void {
    this.gameService.startNewRound();
  }

}
