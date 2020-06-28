import { Player } from './player.interface';
import { Card } from './card';
import { GameStatus } from '../enums/game-status.enum';
import { Deck } from './deck';
import { environment } from '../../../environments/environment';

export interface CardRequestPayout {
  [key: string]: {
    id: string;
    playerId: string;
    cardId?: string;
  };
}

export class Game {
  id?: string;
  hostId: string; // Player.id
  status: GameStatus;
  cardsIn?: CardRequestPayout = {};
  cardsOut?: CardRequestPayout = {};
  lastDiscardedCard: Card;
  players: { [key: string]: Player } = {};
  winnerId?: string; // Player.id
  deck: Deck;

  newObjectUpdate = false;

  constructor(data: Game = null) {
    Object.assign(this, data);
  }

  setHost(player: Player) {
    this.hostId = player.id;
    this.players[player.id] = player;
  }

  waitForPlayers() {
    this.status = GameStatus.WAITING_FOR_PLAYERS;
  }

  startGame() {
    this.status = GameStatus.STARTED;
    this.deck = new Deck();
  }

  updatePlayerAvatars() {
    Object.keys(this.players).forEach((key) => {
      if (!this.players[key].avatar) {
        this.players[key] = { ...this.players[key], avatar: this.getAvatar() };
        this.newObjectUpdate = true;
      }
    });
  }

  pullCardsFromDeck() {
    Object.values(this.cardsIn)
      .reverse()
      .forEach((payout) => {
        let newCard = this.deck.getCardFromDeck();
        if (!newCard) {
          this.deck.handleNoMoreCards();
          newCard = this.deck.getCardFromDeck();
        }
        this.players[payout.playerId].cards[newCard.id] = newCard;
        delete this.cardsIn[payout.id];
        this.newObjectUpdate = true;
      });
  }

  pushCardsToDeck() {
    Object.values(this.cardsOut)
      .reverse()
      .forEach((payout) => {
        const card = this.players[payout.playerId].cards[payout.cardId];
        this.deck.setCardToDiscardedStack(card);
        this.lastDiscardedCard = { ...card };
        delete this.players[payout.playerId].cards[payout.cardId];
        delete this.cardsOut[payout.id];
        this.handleWinner(payout.playerId);
        this.newObjectUpdate = true;
      });
  }

  private handleWinner(playerId: string) {
    if (0 === Object.values(this.players[playerId].cards).length) {
      this.winnerId = playerId;
      this.status = GameStatus.FINISHED;
    }
  }

  private getAvatar() {
    const avatars: string[] = Array(environment.totalAvatarImages)
      .fill(undefined)
      .map((_, index) => `a${index}`);
    Object.values(this.players).forEach((p) => {
      const i = avatars.findIndex((av) => av === p.avatar);
      if (i) {
        avatars.slice(i, 1);
      }
    });
    return avatars.sort(() => Math.random() - 0.5).pop();
  }
}
