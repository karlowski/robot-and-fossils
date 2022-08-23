import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss']
})
export class ScorePanelComponent implements OnInit {

  @Input() isGameOn: boolean;
  @Input() timeLeft: Observable<number>;
  @Input() score: Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
