import {Cell} from "../components/data/cell";

export async function setFigureCoordinates(figure, whichFigureCanStay, cells, setCells) {
    const index = 8 * (figure.y - 1) + (figure.x - 1);

    if (index < 0 || index >= cells.length) {
        console.error('Invalid index:', index);
        return;
    }

    const updatedCells = cells.map((cell, i) => {
        if (i === index) {
            const newCell = new Cell(cell.x, cell.y);
            newCell.setFigure(figure);
            return newCell;
        }

        return cell;
    });

    setCells(updatedCells);

    console.log(updatedCells[index])
    console.log(cells[index])
}
