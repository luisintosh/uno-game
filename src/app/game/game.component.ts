import { Component, OnInit } from '@angular/core';
import { StepperService } from '../shared/services/stepper.service';
import { PlayerService } from '../shared/services/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(private stepperService: StepperService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.signIn();
  }
}
