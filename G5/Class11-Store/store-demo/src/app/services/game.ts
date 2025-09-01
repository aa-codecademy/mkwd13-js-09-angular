import { Injectable, inject } from '@angular/core';
import { GameProgress, GameStore } from '../store/game.store2';
import { checkDraw, checkWinner } from '../store/helpers';

@Injectable({
  providedIn: 'root',
})
export class Game {
  gameStore = inject(GameStore);

  makeMove(position: number) {
    // Early return for invalid states
    if (this.gameStore.isGameOver() || this.gameStore.winner()) {
      console.log('Game is already over');
      return;
    }
    const progress = { ...this.gameStore.gameProgess() };

    if (this.isPossitionOccupied(position, progress)) return;

    const currentPlayer = this.gameStore.currentPlayer();

    progress[currentPlayer].push(position + 1);
    this.gameStore.makeMove(progress);

    const hasWinner = checkWinner(currentPlayer, progress);

    if (hasWinner) {
      this.gameStore.setWinner(currentPlayer);
      return;
    }

    const isDraw = checkDraw(progress, this.gameStore.isGameOver());

    if (isDraw) {
      this.gameStore.setDraw();
      return;
    }

    this.gameStore.togglePlayer();
  }

  private isPossitionOccupied(position: number, progress: GameProgress) {
    return progress.X.includes(position + 1) || progress.O.includes(position + 1);
  }
}
