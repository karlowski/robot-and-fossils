import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rbt-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  @Input() isActive: boolean;

  @Output() startedAgain = new EventEmitter<void>();

  constructor() { }

  onStartAgain(): void {
    this.startedAgain.emit();
  }

  ngOnInit(): void {
  }

}
