import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameProperties } from "../../core/models/initial-properties.enum";

@Injectable({ providedIn: "root" })
export class BoardService {

  private _isGameRunning: boolean = false;
  private _isGameOver: boolean = false;
  private _score = new BehaviorSubject<number>(GameProperties.initialScore);
  private fossilLocation: number = GameProperties.initialFossilLocation;
  protected fossilSprite: string = GameProperties.fossilSprite;
  squares = Array(25).fill(null);

  private fossilLocation_ = new BehaviorSubject<number>(GameProperties.initialFossilLocation);
  fossilLocation$ = this.fossilLocation_.asObservable();

  get score(): number {
    return this._score.getValue();
  }
  get fossil(): number {
    return this.fossilLocation;
  }
  get isGameOver(): boolean {
    return this._isGameOver;
  }
  get isGameRunning(): boolean {
    return this._isGameRunning;
  }
  get sprite(): string {
    return this.fossilSprite;
  }

  newFossilLocation(position: number): void {
    this.fossilLocation = position;
  }
  updateScore(newScore: number) {
    this._score.next(newScore);
  }

  gainScore(): void {
    const currentScore = this._score.getValue();

    this.updateScore(currentScore + 1);
  }

  updateFossil(robotPosition?: number) {
    const newLocation = this.calculateNewFossil(robotPosition)

    this.fossilLocation_.next(newLocation);
  }

  calculateNewFossil(robotPosition?: number): number {
    let newLocation = Math.floor(Math.random() * this.squares.length);

    while(robotPosition && newLocation === robotPosition) {
      newLocation = Math.floor(Math.random() * this.squares.length);
    }

    return newLocation;
  }

  
  updateGameOver(gameOver: boolean) {
    this._isGameOver = gameOver;
  }
  updateGameRunning(gameRunning: boolean) {
    this._isGameRunning = gameRunning;
  }

}
