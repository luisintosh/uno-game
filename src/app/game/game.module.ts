import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HomeComponent } from './views/home/home.component';
import { PlayerListComponent } from './views/player-list/player-list.component';
import { BoardComponent } from './views/board/board.component';
import { WinnerComponent } from './views/winner/winner.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [GameComponent, HomeComponent, PlayerListComponent, BoardComponent, WinnerComponent, RegisterComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
