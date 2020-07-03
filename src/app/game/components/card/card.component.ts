import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cardId: string;
  @Input() selected: boolean;
  @Output() doubleClick = new EventEmitter<any>();

  constructor() {}

  onDblClick($event) {
    this.doubleClick.emit($event);
  }
}
