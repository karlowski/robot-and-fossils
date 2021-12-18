import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() robotSprite?: string;
  @Input() robotDirection?: string;
  @Input() isRobotHere?: boolean;
  @Input() fossilSprite?: string;
  @Input() isFossilHere?: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.robotSprite);
    console.log(this.fossilSprite);
  }

}
