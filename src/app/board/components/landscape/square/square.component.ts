import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rbt-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() robotSprite?: string;
  @Input() robotDirection?: string;
  @Input() set isRobotHere(robot: boolean) {
    this.isRobot = robot;

    if (this.isRobot && this.isFossilHere) {
      this.gainScore();
    }
  };
  @Input() fossilSprite?: string;
  @Input() isFossilHere?: any;

  @Output() scoreGained = new EventEmitter<void>();

  isRobot = false;

  constructor() { }

  ngOnInit(): void { }

  gainScore(): void {
    this.scoreGained.emit();
  }

}
