import { Component, OnInit } from '@angular/core';
import { StepperService } from '../../../shared/services/stepper.service';
import { GameService } from '../../../shared/services/game.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  joinGameForm = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private stepperService: StepperService, private gameService: GameService) {}

  ngOnInit(): void {}

  onNewGame() {
    this.gameService.newGame();
    this.stepperService.completeCurrentStep();
  }

  onJoinGame() {
    this.gameService.joinGame(this.joinGameForm.value).subscribe((response) => {
      if (response) {
        this.stepperService.completeCurrentStep();
      } else {
        this.joinGameForm.setErrors({ invalidID: 'Invalid Game ID' });
      }
    });
  }
}
