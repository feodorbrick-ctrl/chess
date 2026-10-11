
const kingMoves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1]
];

const queenMoves = Array.from({ length: 7 }, (_, index) => {
    const i = index + 1;

    return [
        [i, i],
        [-i, i],
        [i, -i],
        [-i, -i],
        [i, 0],
        [-i, 0],
        [0, -i],
        [0, i]
    ];
}).flat();

const rookMoves = Array.from({ length: 7 }, (_, index) => {
    const i = index + 1;

    return [
        [i, 0],
        [-i, 0],
        [0, -i],
        [0, i]
    ];
}).flat();

const bishopMoves = Array.from({ length: 7 }, (_, index) => {
    const i = index + 1;

    return [
        [i, i],
        [-i, i],
        [i, -i],
        [-i, -i]
    ];
}).flat();

const knightMoves = [
    [-1, 2],
    [-1, -2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1]
];

const pawnMoves = [[0, 1]];

const pawnAttacks = [
    [-1, 1],
    [1, 1]
];

export const possibleMoves = {
    King: {
        Moves: kingMoves,
        Attacks: kingMoves
    },

    Queen: {
        Moves: queenMoves,
        Attacks: queenMoves
    },

    Rook: {
        Moves: rookMoves,
        Attacks: rookMoves
    },

    Bishop: {
        Moves: bishopMoves,
        Attacks: bishopMoves
    },

    Knight: {
        Moves: knightMoves,
        Attacks: knightMoves
    },

    Pawn: {
        Moves: pawnMoves,
        Attacks: pawnAttacks
    }
};
