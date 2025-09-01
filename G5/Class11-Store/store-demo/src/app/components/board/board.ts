import { Component, signal, inject } from '@angular/core';
import { GameStore } from '../../store/game.store';
import { Game } from '../../services/game';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  // APPROACH #1 => Using store for the game state management
  gameStore = inject(GameStore);

  // APPROACH #2 => Using store + service for the game management. The game logic is in the service
  gameService = inject(Game);

  makeMove(move: number) {
    console.log(move);
    // APPROACH #1
    this.gameStore.makeMove(move);

    // APPROACH #2
    // this.gameService.makeMove(move);
  }

  resetGame() {
    // APPROACH #1
    this.gameStore.resetGame();

    // APPROACH #2
    // this.gameService.gameStore.resetGame();
  }
}
