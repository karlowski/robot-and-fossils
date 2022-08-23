import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: any): string {
    const isGameOff = value === 60;
    const isLastSeconds = value < 10;

    if (isGameOff) {
      return '00';
    }
    if (isLastSeconds) {
      return `0${value}`;
    }

    return `${value}`;
  }

}
