export class Cell {
    #color = 'white'
    constructor(coordinateX, coordinateY) {
        this.#color = coordinateX * coordinateY % 2 ? 'white' : 'green';
        this.canFigureStay = false;
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