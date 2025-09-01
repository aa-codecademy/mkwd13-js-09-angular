import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { checkDraw, checkWinner } from './helpers';

export interface GameProgress {
  X: number[]; // push(5); push(2)
  O: number[]; // push(8); push(3)
}

export interface GameState {
  currentPlayer: 'X' | 'O';
  winner: string | null;
  isGameOver: boolean;
  gameProgess: GameProgress;
  board: string[];
}

const initialState: GameState = {
  currentPlayer: 'X',
  winner: null,
  isGameOver: false,
  gameProgess: {
    X: [],
    O: [],
  },
  board: Array.from({ length: 9 }, (_, index) => String('')),
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => ({
    makeMove(move: number) {
      const currentPlayer = state.currentPlayer();
      const progress = state.gameProgess();
      const board = state.board();

      if (state.winner() || state.isGameOver()) return;

      const isMovePlayed = progress.X.includes(move + 1) || progress.O.includes(move + 1);
      console.log('is move played', isMovePlayed);
      if (isMovePlayed) return;

      // 5, X => progress.X.push(5)
      const newProgress: GameProgress = {
        X: [...progress.X],
        O: [...progress.O],
      };

      // newProgress[x].push(1)
      newProgress[currentPlayer].push(move + 1);

      // [WITHOUT USING COMPUTED] APPROACH IF WE DO NOT USE COMPUTED VALUE FOR BOARD
      // [1, 2, 3, 4, 5....]
      const newBoardValue = [...board];
      // move = 0
      // currentPlayer = 'X' / '0'
      // change the element of the index (the value of move) with the value of current player
      // ['X', 2, 3, 4, 5...]
      // UNCOMMENT THIS LINE IF YOU DONT WANT TO USE COMPUTED => [WITHOUT USING COMPUTED]
      // newBoardValue[move] = currentPlayer;

      patchState(state, { gameProgess: newProgress });

      const hasWinner = checkWinner(currentPlayer, newProgress);

      if (hasWinner) {
        console.log('WINNER IS', currentPlayer, newProgress);
        patchState(state, { isGameOver: true, winner: currentPlayer });
        return;
      }

      const isDraw = checkDraw(newProgress, state.isGameOver());
      if (isDraw) {
        patchState(state, { isGameOver: true, winner: 'draw' });

        return;
      }

      this.togglePlayer();
    },

    togglePlayer() {
      const currentPlayer = state.currentPlayer();
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';

      patchState(state, { currentPlayer: nextPlayer });
    },

    resetGame() {
      patchState(state, initialState);
    },
  })),

  withComputed((store) => {
    return {
      // COMMENT THIS LINE IF YOU DONT WANT TO USE COMPUTED => [WITHOUT USING COMPUTED]
      board: () => {
        const currentBoard = [...store.board()];

        store.gameProgess().X.forEach((position) => {
          currentBoard[position - 1] = 'X';
        });

        store.gameProgess().O.forEach((position) => {
          currentBoard[position - 1] = 'O';
        });

        return currentBoard;
      },
    };
  })
);
