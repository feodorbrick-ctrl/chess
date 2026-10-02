export class Figure {
    constructor(x, y) {
        this.name = 'Figure';
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    }

    getName() {
        return this.name;
    }

    getCoordinates() {
        return [this.x, this.y];
    }

    getMoves() {
        return this.possibleMoves;
    }

    moveFigure(moveX, moveY) {
        this.x = moveX;
        this.y = moveY;
    }
}