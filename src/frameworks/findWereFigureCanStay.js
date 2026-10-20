
import { possibleMoves } from "../components/data/figures/possibleMoves";

const switchedCells = []
let isSwitchedCellsvisible = false;

export function findWereFigureCanStay(figuresStays, figure) {
    if (!isSwitchedCellsvisible) {
        if (figure.name !== 'Figure') {
            const moves = possibleMoves[figure.name].Moves;
            const [y, x] = figure.getCoordinates();

            for (let i = 0; i < moves.length; i++) {
                const targetX = x - moves[i][0];
                const targetY = y - moves[i][1];

                if (
                    targetX < 1 || targetX > 8 ||
                    targetY < 1 || targetY > 8
                ) {
                    continue;
                }

                const index = 8 * (targetY - 1) + (targetX - 1);
                const cell = figuresStays[index];

                switchedCells.push(cell)

                if (cell) {
                    cell.whichFigureCanStay = figure;
                    cell.color = 'red';
                }
                isSwitchedCellsvisible = true;
            }
        }
    } else {
        switchedCells.map(cell => cell.whichFigureCanStay = null);
        isSwitchedCellsvisible = false;
    }

    return figuresStays;
}
