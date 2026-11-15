import {Cell} from "../components/data/cell";

export function setFigureCoordinates(figure, whichFigureCanStay, cells, setCells, isGameOnline, webRTC) {
    const index = 8 * (figure.y - 1) + (figure.x - 1);
    const whichFigureCanStayIndex = 8 * (whichFigureCanStay.y - 1) + (whichFigureCanStay.x - 1);

    if (index < 0 || index >= cells.length) {

        console.error('Invalid index:', index);
        return;
    }
    if (isGameOnline) {
        const message = [whichFigureCanStayIndex, index]
        webRTC.sendMessage({type: 'move', message: message})
    }
    console.log(whichFigureCanStay)

    setCells(currentCells => currentCells.map((cell, i) => {
        if (i === index) {
            const newCell = new Cell(cell.x, cell.y);
            newCell.setFigure(whichFigureCanStay);
            return newCell;
        }
        if (i === whichFigureCanStayIndex) {
            return new Cell(cell.x, cell.y);
        }

        return cell;
    }));
}
