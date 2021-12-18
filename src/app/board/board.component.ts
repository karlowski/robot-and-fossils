import { Component, OnInit } from '@angular/core';
import { BoardService } from "./services/board.service";
import {RobotService} from "../core/services/robot.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    public boardService: BoardService,
    public robotService: RobotService
  ) { }

  ngOnInit(): void {
  }

}
