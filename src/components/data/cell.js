import {Figure} from "./figures/figure";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Pawn} from "./figures/Pawn";

const figures = {
    Figure: Figure,
    Pawn: Pawn,
    King: King,
    Queen: Queen,
    Rook: Rook,
    Bishop: Bishop,
    Knight: Knight
};

export class Cell {
    #color = 'white'
    constructor(coordinateX, coordinateY) {
        this.x = coordinateX;
        this.y = coordinateY;
        this.#color = ((coordinateY % 2) + coordinateX) % 2 ? '#ffffff' : '#76C457';
        this.whichFigureCanStay = null;
        this.figure = new Figure(this.x, this.y);
    }

    getCoordinates() {
        return [this.x, this.y];
    }

    getColor () {
        if (this.whichFigureCanStay != null) {
            return 'red'
        }
        return this.#color
    }

    setFigure(figure) {
        this.figure = new figures[figure.name](this.x, this.y);
    }

}