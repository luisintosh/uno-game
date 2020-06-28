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

  getPlayer(): Observable<Player> {
    return this.player;
  }

  logIn(player: Player) {
    return this.auth.signInAnonymously().then((userObject) => {
      player.id = userObject.user.uid;
      return this.api.set(this.basePath, player.id, player).then(() => this.player.next(player));
    });
  }

  logOut() {
    return this.auth.signOut();
  }
}
