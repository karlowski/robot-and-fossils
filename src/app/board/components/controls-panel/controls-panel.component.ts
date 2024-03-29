import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rbt-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent implements OnInit {

  @Input() timeLeft: Observable<number> = new Observable();
  @Input() score: Observable<number> = new Observable();
  @Input() isPlaying = false;
  @Input() isGameOver = false;

  @Output() turnedRight = new EventEmitter<void>();
  @Output() moved = new EventEmitter<void>();
  @Output() turnedLeft = new EventEmitter<void>();
  @Output() started = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  turnLeft(): void {
    this.turnedLeft.emit();
  }

  turnRight(): void {
    this.turnedRight.emit();
  }

  move(): void {
    this.moved.emit();
  }

  onStart(): void {
    this.started.emit();
  }

}
