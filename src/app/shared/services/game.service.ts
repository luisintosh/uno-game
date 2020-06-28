import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';
import { Game } from '../models/game';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
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

  newGame() {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    const newGame = new Game();
    newGame.waitForPlayers();
    this.game$.next(newGame);
  }

  joinGame(gameId: string): Observable<boolean> {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    return this.api.getOne<Game>(this.basePath, gameId).pipe(
      take(1),
      map((response) => {
        if (response && GameStatus.WAITING_FOR_PLAYERS === response.status) {
          this.gameSubscription = this.api.getOne<Game>(this.basePath, gameId).subscribe((update) => {
            const game: Game = this.game$.value || new Game();
            Object.assign(game, update);
            this.game$.next(game);
          });
          return true;
        } else {
          return false;
        }
      })
    );
  }

  setHots(player: Player): Observable<boolean> {
    const game: Game = this.game$.value;
    game.setHost(player);
    return from(this.api.set<Game>(this.basePath, null, game)).pipe(
      map((response) => {
        this.gameSubscription = this.api
          .getOne<Game>(this.basePath, response.id)
          .subscribe((update) => this.game$.next(Object.assign(this.game$.value, update)));
        return !!response;
      }),
      catchError(() => of(false))
    );
  }

  setPlayer(player: Player): Observable<boolean> {
    this.currentPlayerId = player.id;
    return this.game$.pipe(
      take(1),
      switchMap((game) => {
        if (game && GameStatus.WAITING_FOR_PLAYERS === game.status) {
          return from(this.api.update(`${this.basePath}/${game.id}/players`, player.id, player));
        } else {
          return of(null);
        }
      }),
      map((response) => {
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
