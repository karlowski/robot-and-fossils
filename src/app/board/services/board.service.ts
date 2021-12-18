import { Injectable } from "@angular/core";
import { GameProperties } from "../../core/models/initial-properties.enum";

@Injectable({ providedIn: "root" })
export class BoardService {

  private _isGameRunning: boolean = false;
  private _isGameOver: boolean = false;
  private _score: number = GameProperties.initialScore;
  private fossilLocation: number = GameProperties.initialFossilLocation;
  protected fossilSprite: string = GameProperties.fossilSprite;
  squares = Array(25).fill(null);

  public get score(): number {
    return this._score;
  }
  public get fossil(): number {
    return this.fossilLocation;
  }
  public get isGameOver(): boolean {
    return this._isGameOver;
  }
  public get isGameRunning(): boolean {
    return this._isGameRunning;
  }
  public get sprite(): string {
    return this.fossilSprite;
  }

  public updateScore(newScore: number) {
    this._score = newScore;
  }
  public set updateFossil(newPosition: number) {
    this.fossilLocation = newPosition;
  }
  public set updateGameOver(gameOver: boolean) {
    this._isGameOver = gameOver;
  }
  public set updateGameRunning(gameRunning: boolean) {
    this._isGameRunning = gameRunning;
  }

}
