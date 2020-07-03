import { Component, Input } from '@angular/core';
import { Player } from '../../../shared/models/player.interface';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
})
export class GuestListComponent {
  @Input() players: Player[];

  constructor() {}
}
