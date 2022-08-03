import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InitialGameProperties } from "../models/initial-properties.enum";
import { RobotDirections } from "../models/robot-directions.enum";

@Injectable({ providedIn: "root" })
export class RobotService {

  private _position = new BehaviorSubject<number>(InitialGameProperties.RobotLocation);
  position$ = this._position.asObservable();

  private _direction = new BehaviorSubject<string>(InitialGameProperties.RobotDirection);
  direction$ = this._direction.asObservable();

  newPosition(direction: string, isCrashed?: boolean): void {
    const currentPosition = this._position.getValue();

    if (isCrashed) {
      this._position.next(100);
      return;
    }

    if (direction === RobotDirections.Up) {
      this._position.next(currentPosition - 5);
    }
    if (direction === RobotDirections.Down) {
      this._position.next(currentPosition + 5);
    }
    if (direction === RobotDirections.Left) {
      this._position.next(currentPosition - 1);
    }
    if (direction === RobotDirections.Right) {
      this._position.next(currentPosition + 1);
    }
  }

  newDirection(oldDirection: string, isTurnedRight?: boolean): void {

    if (isTurnedRight) {

      if (oldDirection === RobotDirections.Up) {
        this._direction.next(RobotDirections.Right);
      }
      if (oldDirection === RobotDirections.Down) {
        this._direction.next(RobotDirections.Left);
      }
      if (oldDirection === RobotDirections.Left) {
        this._direction.next(RobotDirections.Up);
      }
      if (oldDirection === RobotDirections.Right) {
        this._direction.next(RobotDirections.Down);
      }

    } else {

      if (oldDirection === RobotDirections.Up) {
        this._direction.next(RobotDirections.Left)
      }
      if (oldDirection === RobotDirections.Down) {
        this._direction.next(RobotDirections.Right)
      }
      if (oldDirection === RobotDirections.Left) {
        this._direction.next(RobotDirections.Down)
      }
      if (oldDirection === RobotDirections.Right) {
        this._direction.next(RobotDirections.Up)
      }

    }
  }

  robotRandomizer(): void {
    const newPosition = Math.floor(Math.random() * 24);
    const directionsList = Object.values(RobotDirections);
    const newDirectionId = Math.floor(Math.random() * 4);

    this._position.next(newPosition);
    this._direction.next(directionsList[newDirectionId]);
  }

}
