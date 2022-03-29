import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss']
})
export class PlayerPanelComponent implements OnInit {

  @Output() turnedRight = new EventEmitter<void>();
  @Output() moved = new EventEmitter<void>();
  @Output() turnedLeft = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  turnLeft(): void {
    this.turnedLeft.emit();
  }

  turnRight(): void {
    this.turnedRight.emit();
  }

  move(): void {
    this.moved.emit();
  }

}
