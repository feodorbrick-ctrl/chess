export class Cell {
    #color = 'white'
    constructor(coordinateX, coordinateY) {
        this.x = coordinateX;
        this.y = coordinateY;
        this.#color = coordinateX * coordinateY % 2 ? 'white' : 'green';
        this.canFigureStay = false;
    }

    getCoordinates() {
        return [this.x, this.y];
    }

    getColor () {
        return this.#color
    }

    getCanFigureStay() {
        return this.canFigureStay;
    }

    setCanFigureStay(canFigureStay) {
        if (canFigureStay === true || canFigureStay === false) {
            this.canFigureStay = canFigureStay;
        }
    }
}