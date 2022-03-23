import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerInfoService } from '../services/player-info.service';

@Pipe({
  name: 'nameCheck'
})
export class NameCheckPipe implements PipeTransform {
  players: Player[] = [];
  counter: number = 0;

  constructor(
    private playerService: PlayerInfoService
  ) { }

  transform(name: string): string {
    this.players = this.playerService.getPlayerInfo();
    this.players.map((player) => {
      if (name === player.name) {
        name = name + this.counter;
        this.counter++
      }
    })
    return name;
  }

}
