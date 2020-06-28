import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../shared/services/game.service';
import { Subject } from 'rxjs';
import { Game } from '../../../shared/models/game';
import { StepperService } from '../../../shared/services/stepper.service';
import { GameStatus } from '../../../shared/enums/game-status.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  game: Game;
  unsubscribe$ = new Subject();

  constructor(private gameService: GameService, private stepperService: StepperService) {}

  ngOnInit(): void {
    this.gameService
      .getGame()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((game) => {
        this.game = game;
        if (GameStatus.STARTED === this.game.status) {
          this.stepperService.completeCurrentStep();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onStartGame() {
    this.gameService.startGame();
  }

  onClickBack() {
    this.stepperService.prevStep();
  }

  isHost() {
    return this.gameService.isCurrentUserHost();
  }

  getAvatar(avatarId) {
    return `../../../../assets/images/avatars/${avatarId}.jpg`;
  }
}
