import {Cell} from "./cell";

export const startFigures = [Array.from({length: 64}, (_, index) =>
    new Cell(index % 8, Math.floor(index / 8)))]