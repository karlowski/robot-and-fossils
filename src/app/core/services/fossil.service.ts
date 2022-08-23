import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { InitialGameProperties } from "../enums/initial-properties.enum";

@Injectable({ providedIn: "root" })
export class FossilService {

  private _fossilLocation = new BehaviorSubject<number>(InitialGameProperties.FossilLocation);
  fossilLocation$ = this._fossilLocation.asObservable();

  throwNewFossil(robotPosition?: number) {
    const newLocation = this.calculateNewFossilParameters(robotPosition)
    this._fossilLocation.next(newLocation);
  }

  calculateNewFossilParameters(robotPosition?: number): number {
    let newLocation = Math.floor(Math.random() * InitialGameProperties.FieldLength);

    while (robotPosition && newLocation === robotPosition) {
      newLocation = Math.floor(Math.random() * InitialGameProperties.FieldLength);
    }

    return newLocation;
  }

}
