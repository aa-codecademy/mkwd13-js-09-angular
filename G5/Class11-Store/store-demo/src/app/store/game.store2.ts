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
    makeMove(newProgress: GameProgress) {
      patchState(state, { gameProgess: newProgress });
    },

    togglePlayer() {
      const currentPlayer = state.currentPlayer();
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';

      patchState(state, { currentPlayer: nextPlayer });
    },

    setWinner(winner: string) {
      patchState(state, { isGameOver: true, winner });
    },

    setDraw() {
      patchState(state, { isGameOver: true, winner: 'draw' });
    },

    resetGame() {
      patchState(state, {
        currentPlayer: 'X',
        winner: null,
        isGameOver: false,
        gameProgess: {
          X: [],
          O: [],
        },
        board: Array.from({ length: 9 }, (_, index) => String('')),
      });
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
