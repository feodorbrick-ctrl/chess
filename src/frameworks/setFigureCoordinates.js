import {Cell} from "../components/data/cell";

export function moveFigureByIndex(setCells, fromIndex, toIndex, promotion) {
    setCells(currentCells => {
        const source = currentCells[fromIndex];
        const target = currentCells[toIndex];
        if (!source || !target || source.figure.name === 'Figure') return currentCells;

        const nextCells = [...currentCells];
        nextCells[fromIndex] = new Cell(source.x, source.y);
        nextCells[toIndex] = new Cell(target.x, target.y);
        nextCells[toIndex].setFigure(promotion ?? source.figure);
        return nextCells;
    });
}

export async function setFigureCoordinates(figure, whichFigureCanStay, cells, setCells, isGameOnline, webRTC) {
    const calcCellIndex = (figureObj) => {
        return 8 * (figureObj.y - 1) + (figureObj.x - 1);
    }

    const index = calcCellIndex(figure)
    const whichFigureCanStayIndex = calcCellIndex(whichFigureCanStay)

    if (index < 0 || index >= cells.length) {

        console.error('Invalid index:', index);
        return;
    }
    if (isGameOnline) {
        const message = [index, whichFigureCanStayIndex]
        webRTC.sendMessage({type: 'move', message: message})
        webRTC.sendMessage({type: 'moved'})
    }

    const promotion = index === whichFigureCanStayIndex ? whichFigureCanStay : undefined;
    moveFigureByIndex(setCells, whichFigureCanStayIndex, index, promotion);
}
