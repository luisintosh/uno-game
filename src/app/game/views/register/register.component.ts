import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StepperService } from '../../../shared/services/stepper.service';
import { GameService } from '../../../shared/services/game.service';
import { PlayerService } from '../../../shared/services/player.service';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Player } from '../../../shared/models/player.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  usernameForm = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private stepperService: StepperService,
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  onEnter() {
    this.playerService
      .getPlayer()
      .pipe(
        take(1),
        switchMap((player) => from(this.playerService.setPlayer({ ...player, username: this.usernameForm.value })))
      )
      .subscribe((player) => this.addPlayerToCurrentGame(player));
  }

  private addPlayerToCurrentGame(player: Player) {
    this.gameService
      .getGame()
      .pipe(
        take(1),
        switchMap((game) => {
          player.username = this.usernameForm.value;
          this.gameService.setPlayer(player);
          if (game.id) {
            return this.gameService.setPlayer(player);
          } else {
            return this.gameService.setHost(player);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          this.stepperService.completeCurrentStep();
        } else {
          this.usernameForm.setErrors({ invalidUsername: 'Invalid username' });
        }
      });
  }
}
