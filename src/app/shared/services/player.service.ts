import { Injectable } from '@angular/core';
import { Player } from '../models/player.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, switchMap } from 'rxjs/operators';
import { RealTimeDatabaseService } from './real-time-database.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private basePath = 'players';
  private player: BehaviorSubject<Player> = new BehaviorSubject(null);

  constructor(private auth: AngularFireAuth, private api: RealTimeDatabaseService) {
    this.auth.user
      .pipe(
        filter((user) => !!user),
        switchMap((user) => this.api.getOne<Player>(this.basePath, user.uid))
      )
      .subscribe((player) => {
        this.player.next(player);
      });
  }

  signIn() {
    return this.auth.signInAnonymously();
  }

  logOut() {
    return this.auth.signOut();
  }

  getPlayer(): Observable<Player> {
    return this.player.asObservable();
  }

  setPlayer(player: Player) {
    return this.auth.currentUser.then((user) => {
      player.id = user.uid;
      return this.api.set(this.basePath, player.id, player).then((update: Player) => {
        this.player.next(update);
        return update;
      });
    });
  }
}
