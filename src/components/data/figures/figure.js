export class Figure {
    color = 'black';
    constructor(x, y, color) {
        this.name = 'Figure';
        this.x = x;
        this.y = y;
        this._img = ''
        this.color = color;
    }

    getCoordinates() {
        return [this.x, this.y];
    }
}