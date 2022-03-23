import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  players: Player[] = [];

  constructor(
    private db: AngularFirestore
  ) { }

  setPlayerInfo(playerArray: Player[]) {
    this.players = playerArray;
  }

  getPlayerInfo() {
    return this.players;
  }
}
