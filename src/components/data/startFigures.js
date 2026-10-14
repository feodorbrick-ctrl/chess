
import { Cell } from './cell.js';
import { Pawn } from './figures/Pawn';
import { Rook } from './figures/Rook';
import { Bishop } from './figures/Bishop';
import { Queen } from './figures/Queen';
import { King } from './figures/King';
import { Knight } from './figures/Knight';

export const startFigures = Array.from(
    { length: 64 },
    (_, index) => new Cell(index % 8, Math.floor(index / 8))
);

// Белые пешки
for (let x = 0; x < 8; x++) {
    startFigures[8 * 8 - 16 + x].figure = new Pawn(7, x + 1);
}

// Белые фигуры
startFigures[56].figure = new Rook(8, 1);
startFigures[57].figure = new Knight(8, 2);
startFigures[58].figure = new Bishop(8, 3);
startFigures[59].figure = new Queen(8, 4);
startFigures[60].figure = new King(8, 5);
startFigures[61].figure = new Bishop(8, 6);
startFigures[62].figure = new Knight(8, 7);
startFigures[63].figure = new Rook(8, 8);
