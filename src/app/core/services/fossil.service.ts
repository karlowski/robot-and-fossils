import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { InitialGameProperties } from "../models/initial-properties.enum";

@Injectable({ providedIn: "root" })
export class FossilService {

  private fossilLocation_ = new BehaviorSubject<number>(InitialGameProperties.FossilLocation);
  fossilLocation$ = this.fossilLocation_.asObservable();

  throwNewFossil(robotPosition?: number) {
    const newLocation = this.calculateNewFossil(robotPosition)

    this.fossilLocation_.next(newLocation);
  }

  calculateNewFossil(robotPosition?: number): number {
    let newLocation = Math.floor(Math.random() * InitialGameProperties.FieldLength);

    while (robotPosition && newLocation === robotPosition) {
      newLocation = Math.floor(Math.random() * InitialGameProperties.FieldLength);
    }

    return newLocation;
  }

}
