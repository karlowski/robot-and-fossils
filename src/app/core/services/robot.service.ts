import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameProperties } from "../models/initial-properties.enum";
import { RobotProperties } from "../models/robot-preperties.enum";

@Injectable({ providedIn: "root" })
export class RobotService {

  private _position = new BehaviorSubject<number>(GameProperties.initialRobotLocation);
  position$ = this._position.asObservable();

  private _direction = new BehaviorSubject<string>(GameProperties.initialRobotDirection);
  direction$ = this._direction.asObservable();

  // private _position: number = GameProperties.initialRobotLocation;
  // private _direction: string = GameProperties.initialRobotDirection;
  protected robotSprite: string = GameProperties.robotSprite;

  // public get position(): number {
  //   return this._position;
  // }
  // public get direction(): string {
  //   return this._direction;
  // }
  public get sprite(): string {
    return this.robotSprite;
  }

  newPosition(direction: string): void {
    const currentPosition = this._position.getValue();

    if (direction === RobotProperties.DirectionUp) {
      this._position.next(currentPosition - 5);
    }
    if (direction === RobotProperties.DirectionDown) {
      this._position.next(currentPosition + 5);
    }
    if (direction === RobotProperties.DirectionLeft) {
      this._position.next(currentPosition - 1);
    }
    if (direction === RobotProperties.DirectionRight) {
      this._position.next(currentPosition + 1);
    }
  }

  newDirection(oldDirection: string, isTurnedRight?: boolean): void {

    if (isTurnedRight) {

      if (oldDirection === RobotProperties.DirectionUp) {
        this._direction.next(RobotProperties.DirectionRight);
      }
      if (oldDirection === RobotProperties.DirectionDown) {
        this._direction.next(RobotProperties.DirectionLeft);
      }
      if (oldDirection === RobotProperties.DirectionLeft) {
        this._direction.next(RobotProperties.DirectionUp);
      }
      if (oldDirection === RobotProperties.DirectionRight) {
        this._direction.next(RobotProperties.DirectionDown);
      }

    } else {

      if (oldDirection === RobotProperties.DirectionUp) {
        this._direction.next(RobotProperties.DirectionLeft)
      }
      if (oldDirection === RobotProperties.DirectionDown) {
        this._direction.next(RobotProperties.DirectionRight)
      }
      if (oldDirection === RobotProperties.DirectionLeft) {
        this._direction.next(RobotProperties.DirectionDown)
      }
      if (oldDirection === RobotProperties.DirectionRight) {
        this._direction.next(RobotProperties.DirectionUp)
      }

    }
  }

  robotRandomizer(): void {
    const newPosition = Math.floor(Math.random() * 24);
    const directionsList = Object.values(RobotProperties);
    const newDirectionId = Math.floor(Math.random() * 4) - 1;

    this._position.next(newPosition);
    this._direction.next(directionsList[newDirectionId]);
  }

  // public updatePosition(newPosition: number): void {
  //   this._direction = newPosition;
  // }
  // public updateDirection(newDirection: string): void {
  //   this._direction = newDirection;
  // }

}
