import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, map, Observable, takeWhile, timer } from "rxjs";

import { InitialGameProperties } from "../enums/initial-properties.enum";
import { FossilService } from "./fossil.service";
import { RobotService } from "./robot.service";
import {RobotDirections} from "@app/core/enums/robot-directions.enum";

@Injectable({ providedIn: "root" })
export class GameService {

  isGameRunning: boolean = false;
  isGameOver: boolean = false;

  timer: Observable<void> = timer(0, InitialGameProperties.Tick).pipe(
    takeWhile(() => !!this.currentTime && !this.isGameOver),
    map(() => this.timerTick()),
    finalize(() => this.endRound())
  );

  private _score = new BehaviorSubject<number>(InitialGameProperties.Score);
  score$ = this._score.asObservable();

  private _timeLeft = new BehaviorSubject<number>(InitialGameProperties.Time);
  timeLeft$ = this._timeLeft.asObservable();

  constructor(
    private robotService: RobotService,
    private fossilService: FossilService
  ) { }

  get score(): number {
    return this._score.getValue();
  }
  get currentTime(): number {
    return this._timeLeft.getValue();
  }

  startNewRound(): void {
    if (this.score) {
      this._score.next(InitialGameProperties.Score);
    }

    if (this.isGameOver) {
      this.randomizeRobotEmplacement();
      this.fossilService.throwNewFossil();
    }

    this.isGameOver = false;
    this.isGameRunning = true;
    this.timer.subscribe();
  }

  get fossilLocation(): Observable<number> {
    return this.fossilService.fossilLocation$;
  }

  get robotLocation(): Observable<number> {
    return this.robotService.position$;
  }

  get robotDirection(): Observable<string> {
    return this.robotService.direction$;
  }

  gainScorePoint(newScore: number) {
    this._score.next(newScore);
  }

  updateScore(): void {
    const currentScore = this._score.getValue();
    this.gainScorePoint(currentScore + 1);
  }

  updateFossil(robotPosition?: number) {
    this.fossilService.throwNewFossil(robotPosition);
  }

  updateRobotDirection(direction: string, toRight: boolean = false): void {
    this.robotService.newDirection(direction, toRight);
  }

  updateRobotLocation(direction: string, position: number): void {
    const isRightCrash = (position === 4 || position === 9 || position === 14 || position === 19 || position === 24) && direction === RobotDirections.Right;
    const isLeftCrash = (position === 0 || position === 5 || position === 10 || position === 15 || position === 20) && direction === RobotDirections.Left;
    const isUpCrash = (position - 5) < 0 && direction === 'up';
    const isDownCrash = (position + 5) > 24 && direction === 'down';

    if (isRightCrash || isLeftCrash || isUpCrash || isDownCrash) {
      this.robotService.newPosition(direction, true);
      this.endRound();
    } else {
      this.robotService.newPosition(direction);
    }
  }

  endRound(): void {
    this.isGameRunning = false;
    this.isGameOver = true;
    this._timeLeft.next(InitialGameProperties.Time);
  }

  randomizeRobotEmplacement(): void {
    this.robotService.robotRandomizer();
  }

  timerTick(): void {
    const currentTimeLeft = this._timeLeft.getValue();
    this._timeLeft.next(currentTimeLeft - 1);
  }

}
