import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../shared/models/player.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() cardSize: 'sm' | 'md' | 'lg' = 'lg';

  constructor() {}

  ngOnInit(): void {}

  getAvatar() {
    return `./../../../../assets/images/avatars/${this.player.avatar}.jpg`;
  }

  countPlayerCards() {
    return this.player.cards ? Object.keys(this.player.cards).length : 0;
  }
}
