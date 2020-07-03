import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../shared/services/game.service';
import { Game } from '../../../shared/models/game';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../shared/models/player.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  game: Game;
  unsubscribe$ = new Subject();

  constructor(private gameService: GameService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.gameService
      .getGame()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((game) => {
        this.game = game;
      });
  }

  getPlayer(): Observable<Player> {
    return this.playerService.getPlayer().pipe(
      filter((player) => !!player),
      map((player) => this.game.players[player.id])
    );
  }

  getGuestList() {
    return this.game.getPlayersList();
  }
}
