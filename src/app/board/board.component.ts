import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subject, tap } from 'rxjs';

import { BoardService } from './services/board.service';
import { RobotService } from '../core/services/robot.service';
import { RobotProperties } from '@app/core/models/robot-preperties.enum';
import { IGameData } from './interfaces/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  destroy$ = new Subject<void>();

  robotPosition$: Observable<number>;
  robotDirection$: Observable<string>;
  fossilPosition$: Observable<number>;
  mainGameData$: Observable<IGameData>;

  // robotPosition: number;
  // robotDirection: string;
  fossilPosition: number = 0;
  squares: null[];

  robotSpriteUrl: string;
  fossilSpriteUrl: string;

  constructor(
    private boardService: BoardService,
    private robotService: RobotService
  ) {
    this.robotService.robotRandomizer();
    this.boardService.updateFossil();
    // this.robotPosition = robotService.position;
    // this.robotDirection = robotService.direction;
    // this.fossilPosition = boardService.fossil;
    this.squares = boardService.squares;
    this.robotSpriteUrl = robotService.sprite;
    this.fossilSpriteUrl = boardService.sprite;

    this.robotPosition$ = this.robotService.position$;
    this.robotDirection$ = this.robotService.direction$;
    this.fossilPosition$ = this.boardService.fossilLocation$.pipe(
      tap(position => this.fossilPosition = position)
    );

    this.mainGameData$ = combineLatest([
      this.robotService.position$,
      this.robotService.direction$
    ]).pipe(
      map(gameData => {
        const [robotPosition, robotDirection] = gameData;

        if (robotPosition === this.fossilPosition) {
          this.boardService.gainScore();
          this.boardService.updateFossil(robotPosition);
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

  onTurnLeft(direction: any): void {
    this.robotService.newDirection(direction);
  }

  onMove(direction: any): void {
    this.robotService.newPosition(direction);
  }

  onTurnRight(direction: any): void {
    const isTurnedRight = true;

    this.robotService.newDirection(direction, isTurnedRight);
  }

}
