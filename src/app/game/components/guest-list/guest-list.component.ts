import { Component, Input } from '@angular/core';
import { Player } from '../../../shared/models/player.interface';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
})
export class GuestListComponent {
  @Input() players: Player[];

  carouselConfig: SwiperConfigInterface = {
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  };

  constructor() {}
}
