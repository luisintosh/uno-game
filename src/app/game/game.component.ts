import { Component, OnInit } from '@angular/core';
import { StepperService } from '../shared/services/stepper.service';
import { StepId } from '../shared/enums/step-id.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(private stepperService: StepperService) {}

  ngOnInit(): void {}
}