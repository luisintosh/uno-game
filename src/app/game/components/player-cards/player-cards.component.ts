import { Component, Input } from '@angular/core';
import { Player } from '../../../shared/models/player.interface';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-player-cards',
  templateUrl: './player-cards.component.html',
  styleUrls: ['./player-cards.component.scss'],
})
export class PlayerCardsComponent {
  @Input() player: Player;

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  };

  constructor() {}

  getPlayerCards() {
    return this.player.cards ? Object.values(this.player.cards) : 0;
  }
}
