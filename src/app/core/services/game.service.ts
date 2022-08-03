import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, map, Observable, takeWhile, timer } from "rxjs";

import { InitialGameProperties } from "../models/initial-properties.enum";
import { FossilService } from "./fossil.service";
import { RobotService } from "./robot.service";

@Injectable({ providedIn: "root" })
export class GameService {

  private _isGameRunning: boolean = false;
  private _isGameOver: boolean = false;
  private _timer: any;

  private _score = new BehaviorSubject<number>(InitialGameProperties.Score);
  score$ = this._score.asObservable();

  private _timeLeft = new BehaviorSubject<number>(InitialGameProperties.Time);
  timeLeft$ = this._timeLeft.asObservable();

  private timer = timer(0, InitialGameProperties.Tick).pipe(
    takeWhile(() => !!this.currentTime && !this._isGameOver),
    map(() => {
      this.timerTick();
    }),
    finalize(() => {
      this.endRound();
    })
  );

  constructor(
    private robotService: RobotService,
    private fossilService: FossilService
  ) { }

  get score(): number {
    return this._score.getValue();
  }
  get isGameOver(): boolean {
    return this._isGameOver;
  }
  get isGameRunning(): boolean {
    return this._isGameRunning;
  }
  get currentTime(): number {
    return this._timeLeft.getValue();
  }

  startNewRound(): void {
    if (this.score) {
      this._score.next(InitialGameProperties.Score);
    }

    if (this._isGameOver) {
      this.randomizeRobotEmplacement();
      this.fossilService.throwNewFossil();
    }

    this._isGameOver = false;
    this._isGameRunning = true;
    this.timer.subscribe();
    console.log('started');
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

  updateRobotDirection(direction: string, toRight?: boolean): void {
    this.robotService.newDirection(direction, toRight);
  }

  updateRobotLocation(direction: string, position: number): void {
    const isRightCrash = (position === 4 || position === 9 || position === 14 || position === 19 || position === 24) && direction === 'right';
    const isLeftCrash = (position === 0 || position === 5 || position === 10 || position === 15 || position === 20) && direction === 'left';
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
    this._isGameRunning = false;
    this._isGameOver = true;
    this._timeLeft.next(InitialGameProperties.Time);

    console.log('completed');
  }

  randomizeRobotEmplacement(): void {
    this.robotService.robotRandomizer();
  }

  updateGameOver(gameOver: boolean) {
    this._isGameOver = gameOver;
    this.isGameOver
  }

  updateGameRunning(gameRunning: boolean) {
    this._isGameRunning = gameRunning;
  }

  timerTick(): void {
    const currentTimeLeft = this._timeLeft.getValue();

    this._timeLeft.next(currentTimeLeft - 1);
  }

}
