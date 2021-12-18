import {Injectable} from "@angular/core";
import {GameProperties} from "../models/initial-properties.enum";

@Injectable({ providedIn: "root" })
export class RobotService {

  private _position: number = GameProperties.initialRobotLocation;
  private _direction: string = GameProperties.initialRobotDirection;
  protected robotSprite: string = GameProperties.robotSprite;

  public get position(): number {
    return this._position;
  }
  public get direction(): string {
    return this._direction;
  }
  public get sprite(): string {
    return this.robotSprite;
  }

  public set updatePosition(newPosition: number) {
    this._position = newPosition;
  }
  public set updateDirection(newDirection: string) {
    this._direction = newDirection;
  }

}
