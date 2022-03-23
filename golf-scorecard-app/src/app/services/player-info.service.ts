import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  players: Player[] = [];

  constructor() { }

  setPlayerInfo(playerArray: Player[]) {
    this.players = playerArray;
  }

  getPlayerInfo() {
    return this.players;
  }
}
