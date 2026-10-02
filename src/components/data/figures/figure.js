export class Figure {
    constructor(x, y) {
        this.name = 'Figure';
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
        this.possibleAttacks = []
    }

    getName() {
        return this.name;
    }

    getCoordinates() {
        return [this.x, this.y];
    }

    getMovesInfo() {
        return {moves: this.possibleMoves, attacks: this.possibleAttacks};
    }

    moveFigure(moveX, moveY) {
        this.x = moveX;
        this.y = moveY;
    }
}