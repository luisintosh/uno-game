import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, of, from, Observable, throwError } from 'rxjs';
import { Game } from '../models/game';
import { filter, take, map, catchError, switchMap } from 'rxjs/operators';
import { RealTimeDatabaseService } from './real-time-database.service';
import { GameStatus } from '../enums/game-status.enum';
import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentPlayerId: string; // Player.id

  private basePath = 'games';
  private game$ = new BehaviorSubject<Game>(null);
  private gameSubscription: Subscription;

  constructor(private api: RealTimeDatabaseService) {
    this.handleGameChanges();
  }

  getGame() {
    return this.game$.asObservable();
  }

  newGame(player: Player): Observable<boolean> {
    this.currentPlayerId = player.id;
    const newGame = new Game();
    newGame.setNewGame(player);
    this.game$.next(newGame);
    return from(this.api.set<Game>(this.basePath, null, newGame)).pipe(
      map((response) => {
        this.gameSubscription = this.api
          .getOne<Game>(this.basePath, response.id)
          .subscribe((update) => this.game$.next(Object.assign(this.game$.value, update)));
        return !!response;
      }),
      catchError(() => of(false))
    );
  }

  joinGame(gameId: string, player: Player): Observable<boolean> {
    this.currentPlayerId = player.id;
    this.game$.next(null);
    return this.api.getOne<Game>(this.basePath, gameId).pipe(
      take(1),
      switchMap((game) => {
        if (game) {
          return from(this.api.update(`${this.basePath}/${gameId}/players`, player.id, player));
        } else {
          return throwError('No game');
        }
      }),
      catchError(() => of(false)),
      map((response) => {
        if (response) {
          this.gameSubscription = this.api.getOne<Game>(this.basePath, gameId).subscribe((update) => {
            const game: Game = this.game$.value || new Game();
            Object.assign(game, update);
            this.game$.next(game);
          });
        }
        return !!response;
      })
    );
  }

  private handleGameChanges() {
    this.game$.pipe(filter((game) => game && this.currentPlayerId === game.hostId)).subscribe((game: Game) => {
      // add avatar image for users
      if (GameStatus.WAITING_FOR_PLAYERS === game.status) {
        game.updatePlayerAvatars();
      }
      // dispatch card to a user
      if (game.cardsIn && Object.keys(game.cardsIn).length > 0) {
        game.pullCardsFromDeck();
      }
      // add card to discarded stack
      if (game.cardsOut && Object.keys(game.cardsOut).length > 0) {
        game.pushCardsToDeck();
      }

      // save
      if (game.newObjectUpdate) {
        game.newObjectUpdate = false;
        this.api.update(this.basePath, game.id, game);
      }
    });
  }
}
