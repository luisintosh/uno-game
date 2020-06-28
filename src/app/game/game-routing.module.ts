import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { PlayerListComponent } from './views/player-list/player-list.component';
import { BoardComponent } from './views/board/board.component';
import { WinnerComponent } from './views/winner/winner.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'start',
        component: HomeComponent,
      },
      {
        path: 'set-player',
        component: RegisterComponent,
      },
      {
        path: 'waiting-for-players',
        component: PlayerListComponent,
      },
      {
        path: 'game',
        component: BoardComponent,
      },
      {
        path: 'game/:id',
        component: BoardComponent,
      },
      {
        path: 'winner',
        component: WinnerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
