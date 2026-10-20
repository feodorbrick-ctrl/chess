import {Cell} from "../components/data/cell";

export function setFigureCoordinates(figure, whichFigureCanStay, cells, setCells) {
    const index = 8 * (figure.y - 1) + (figure.x - 1);

    if (index < 0 || index >= cells.length) {
        console.error('Invalid index:', index);
        return;
    }

    setCells(currentCells => currentCells.map((cell, i) => {
        if (i === index) {
            const newCell = new Cell(cell.y, cell.x);
            newCell.setFigure(whichFigureCanStay);
            return newCell;
        }

        return cell;
    }));
}
