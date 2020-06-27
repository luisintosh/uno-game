import { Card } from './card';
export interface Player {
  id?: string;
  username: string;
  avatar?: string;
  cards?: Card[];
}
