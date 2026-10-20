export class Figure {
    constructor(x, y) {
        this.name = 'Figure';
        this.x = x;
        this.y = y;
        this._img = ''
        this.color = ''
    }

    setColor(color) {
        this.color = color;
    }

    getCoordinates() {
        return [this.x, this.y];
    }
}