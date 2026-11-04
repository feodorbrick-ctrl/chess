import {isMoveSafe} from "./gameRules";

const switchedCells = [];
let isSwitchedCellsVisible = false;

export function findWereFigureCanStay(figuresStays, figure, whoIsGoing) {
    if (isSwitchedCellsVisible) {
        switchedCells.forEach(cell => {
            cell.whichFigureCanStay = null;
        });

        switchedCells.length = 0;
        isSwitchedCellsVisible = false;

        return figuresStays;
    }

    if (figure.name === "Figure") {
        return figuresStays;
    }

    const moves = figure.possibleMoves;
    const attacks = figure.possibleAttacks;

    if (!moves) {
        return figuresStays;
    }

    const [x, y] = figure.getCoordinates();

    const directions = new Map();

    for (const move of moves) {
        const targetX = figure.color === 'black' ? x - move[1] : x + move[1];
        const targetY = figure.color === 'black' ? y - move[0] : y + move[0];

        if (
            targetX < 1 || targetX > 8 ||
            targetY < 1 || targetY > 8
        ) {
            continue;
        }

        const index = 8 * (targetY - 1) + (targetX - 1);
        const cell = figuresStays[index];

        if (!cell) continue;

        if (
            figure.name === 'King' &&
            !isMoveSafe(figuresStays, figure, targetX, targetY)
        ) {
            continue;
        }

        if (figure.name !== "Knight") {
            const directionX = Math.sign(move[0]);
            const directionY = Math.sign(move[1]);
            const direction = `${directionX},${directionY}`;

            if (directions.has(direction) && directions.get(direction)) {
                continue;
            }

            if (cell.figure.name !== "Figure") {
                directions.set(direction, true);
                if (cell.figure.color === figure.color) {
                    continue;
                }
            }
        } else if (cell.figure.name !== 'Figure' && cell.figure.color === figure.color) {
            continue;
        }
        if (figure.name === 'Pawn' && cell.figure.name !== 'Figure') continue;

        if (figure.color === whoIsGoing) {
            cell.whichFigureCanStay = figure;
            switchedCells.push(cell);
        }
    }
    if (figure.name === "Pawn") {
        for (const attack of attacks) {
            const targetX = figure.color === 'black' ? x - attack[1] : x + attack[1];
            const targetY = figure.color === 'black' ? y - attack[0] : y + attack[0];

            if (
                targetX < 1 || targetX > 8 ||
                targetY < 1 || targetY > 8
            ) {
                continue;
            }

            const index = 8 * (targetY - 1) + (targetX - 1);
            const cell = figuresStays[index];

            if (!cell) continue;

            if (cell.figure.name === "Figure" || whoIsGoing === cell.figure.color) continue;

            if (figure.color === whoIsGoing) {
                cell.whichFigureCanStay = figure;
                switchedCells.push(cell);
            }
        }
    }

    isSwitchedCellsVisible = switchedCells.length > 0;

    return figuresStays;
}