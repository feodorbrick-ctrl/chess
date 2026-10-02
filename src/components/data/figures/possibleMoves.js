export const possibleMoves = (x, y) => ({
    King: {
        Moves: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [-1, 1], [1, -1]],
        Attacks: this.Moves
    },
    Queen: {
        Moves: Array.from({ length: 8 }, (_, index) => [
            [index, index],
            [-index, index],
            [index, -index],
            [-index, -index],
            [index, 0],
            [-index, 0],
            [0, -index],
            [0, index]
        ]).flat(),
        Attacks: this.Moves
    },
    Rook: {
        Moves: Array.from({ length: 8 }, (_, index) => [
            [index, 0],
            [-index, 0],
            [0, -index],
            [0, index]
        ]).flat(),
        Attacks: this.Moves
    },
    Bishop: {
        Moves: Array.from({ length: 8 }, (_, index) => [
            [index, index],
            [-index, index],
            [index, -index],
            [-index, -index]
        ]).flat(),
        Attacks: this.Moves
    },
    Knight: {
        Moves: [[-1, 2], [-1, -2], [1, -2], [1, 2], [2, -1], [2, 1], [-2, -1], [-2, 1]],
        Attacks: this.Moves
    },
    Pawn: {
        Moves: [[0, 1]],
        Attacks: [[-1, 1], [1, 1]],
    }
})