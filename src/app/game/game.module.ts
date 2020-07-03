import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HomeComponent } from './views/home/home.component';
import { PlayerListComponent } from './views/player-list/player-list.component';
import { BoardComponent } from './views/board/board.component';
import { WinnerComponent } from './views/winner/winner.component';
import { RegisterComponent } from './views/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { PlayerComponent } from './components/player/player.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { PlayerCardsComponent } from './components/player-cards/player-cards.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [
    GameComponent,
    HomeComponent,
    PlayerListComponent,
    BoardComponent,
    WinnerComponent,
    RegisterComponent,
    CardComponent,
    PlayerComponent,
    PlayerListComponent,
    GuestListComponent,
    PlayerCardsComponent,
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, ReactiveFormsModule, SwiperModule],
})
export class GameModule {}
