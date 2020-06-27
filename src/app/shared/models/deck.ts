import { Card } from './card';
import { CardColor } from '../enums/card-color.enum';
import { CardType } from '../enums/card-type.enum';

export class Deck {
  private cards: Card[] = [];
  private discardedStack: Card[] = [];
  private configuration = {
    firstHandCount: 7,
  };

  constructor(cards?: Card[], discardedStack?: Card[]) {
    if (cards || discardedStack) {
      this.cards = cards || [];
      this.discardedStack = discardedStack || [];
    } else {
      this.buildDeck();
    }
  }

  setDeck(cards: Card[], discardedStack: Card[]) {
    this.cards = cards;
    this.discardedStack = discardedStack;
  }

  getCurrentDeck() {
    return { cards: this.cards, discardedStack: this.discardedStack };
  }

  getCardFromDeck(): Card {
    return this.cards.pop();
  }

  getFirstHand(): Card[] {
    return Array(this.configuration.firstHandCount)
      .fill(undefined)
      .map(() => this.cards.pop());
  }

  setCardToDiscardedStack(card: Card) {
    this.discardedStack.push(card);
  }

  getLastDiscardedCard(): Card {
    return this.discardedStack[this.discardedStack.length - 1];
  }

  handleNoMoreCards() {
    this.cards = this.discardedStack;
    this.shufflingCards();
  }

  private buildDeck() {
    this.cards = this.generateCards();
    this.shufflingCards();
  }

  private generateCards(): Card[] {
    const imageSpritesX = 14;
    const imageSpritesY = 8;
    const cards: Card[] = [];
    for (let x = 0; x < imageSpritesX; x++) {
      for (let y = 0; y < imageSpritesY; y++) {
        if (0 === x && y >= 4) {
          continue;
        }
        const card = new Card(`c${x}${y}`);
        card.positionX = x;
        card.positionY = y;
        if (9 <= x) {
          if (4 >= y && 0 === x) {
            continue;
          }
          card.type = CardType.NUMERIC;
          card.cardNumber = x;
        }
        if (10 === x) {
          card.type = CardType.SKIP;
        } else if (11 === x) {
          card.type = CardType.REVERSE;
        } else if (12 === x) {
          card.type = CardType.DRAW_TWO;
        } else if (13 === x && 4 > y) {
          card.type = CardType.WILD;
        } else if (13 === x && 4 <= y) {
          card.type = CardType.WILD_DRAW_FOUR;
        }
        if (9 >= x) {
          if (0 === y || 4 === y) {
            card.color = CardColor.RED;
          } else if (1 === y || 5 === y) {
            card.color = CardColor.YELLOW;
          } else if (2 === y || 6 === y) {
            card.color = CardColor.GREEN;
          } else if (3 === y || 7 === y) {
            card.color = CardColor.BLUE;
          }
        }
        cards.push(card);
      }
    }
    return cards;
  }

  private shufflingCards() {
    this.cards.sort(() => Math.random() - 0.5);
  }
}
