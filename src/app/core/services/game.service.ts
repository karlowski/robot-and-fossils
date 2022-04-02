import { Injectable } from "@angular/core";
import { BehaviorSubject, endWith, finalize, interval, map, Observable, skip, take, takeUntil, takeWhile, timer } from "rxjs";

import { GameProperties } from "../models/initial-properties.enum";
import { FossilService } from "./fossil.service";
import { RobotService } from "./robot.service";

@Injectable({ providedIn: "root" })
export class GameService {

  private _isGameRunning: boolean = false;
  private _isGameOver: boolean = false;

  private _score = new BehaviorSubject<number>(GameProperties.initialScore);
  score$ = this._score.asObservable();

  private _timeLeft = new BehaviorSubject<number>(GameProperties.initialTime);
  timeLeft$ = this._timeLeft.asObservable();

  private timer = timer(0, GameProperties.gameTick).pipe(
    takeWhile(() => !!this.currentTime || this._isGameOver),
    map(() => {
      this.timerTick();
    }),
    finalize(() => {
      this._isGameRunning = false;
      this._isGameOver = true;
      this._timeLeft.next(GameProperties.initialTime);

      console.log('completed');
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
      this._score.next(GameProperties.initialScore);
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

  updateRobotLocation(direction: string): void {
    this.robotService.newPosition(direction);
  }

  randomizeRobotEmplacement(): void {
    this.robotService.robotRandomizer();
  }

  updateGameOver(gameOver: boolean) {
    this._isGameOver = gameOver;
  }
  updateGameRunning(gameRunning: boolean) {
    this._isGameRunning = gameRunning;
  }

  timerTick(): void {
    const currentTimeLeft = this._timeLeft.getValue();

    this._timeLeft.next(currentTimeLeft - 1);
  }

}
