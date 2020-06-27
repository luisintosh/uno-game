import { CardType } from '../enums/card-type.enum';
import { CardColor } from '../enums/card-color.enum';

export class Card {
  id: string;
  type: CardType;
  color?: CardColor;
  cardNumber?: number;
  points: number;
  positionX: number;
  positionY: number;

  constructor(
    id: string,
    type: CardType = null,
    color: CardColor = null,
    cardNumber: number = null,
    positionX: number = null,
    positionY: number = null,
    points: number = null
  ) {
    Object.assign(this, { id, type, color, cardNumber, positionX, positionY, points });
  }
}
