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
    window.localStorage.setItem('players', JSON.stringify(this.players))
  }

  getPlayerInfo() {
    let playersJson = window.localStorage.getItem('players');
    this.players = JSON.parse(playersJson)
    return this.players;
  }
}
