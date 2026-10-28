
import { Cell } from './cell.js';
import { Pawn } from './figures/Pawn';
import { Rook } from './figures/Rook';
import { Bishop } from './figures/Bishop';
import { Queen } from './figures/Queen';
import { King } from './figures/King';
import { Knight } from './figures/Knight';

export const startFigures = Array.from(
    { length: 64 },
    (_, index) => new Cell(1 + index % 8, 1 + Math.floor(index / 8))
);

startFigures[0].figure = new Rook(1, 1, 'white');
startFigures[1].figure = new Knight(2, 1, 'white');
startFigures[2].figure = new Bishop(3, 1, 'white');
startFigures[3].figure = new Queen(4, 1, 'white');
startFigures[4].figure = new King(5, 1, 'white');
startFigures[5].figure = new Bishop(6, 1, 'white');
startFigures[6].figure = new Knight(7, 1, 'white');
startFigures[7].figure = new Rook(8, 1, 'white');

for (let x = 0; x < 8; x++) {
    startFigures[8 + x].figure = new Pawn(x + 1,2, 'white');
}

for (let x = 0; x < 8; x++) {
    startFigures[8 * 8 - 16 + x].figure = new Pawn(x + 1, 7);
}

startFigures[56].figure = new Rook(1, 8);
startFigures[57].figure = new Knight(2, 8);
startFigures[58].figure = new Bishop(3, 8);
startFigures[59].figure = new Queen(4, 8);
startFigures[60].figure = new King(5, 8);
startFigures[61].figure = new Bishop(6, 8);
startFigures[62].figure = new Knight(7, 8);
startFigures[63].figure = new Rook(8, 8);
