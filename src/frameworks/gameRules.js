
const getIndex = (x, y) => 8 * (y - 1) + (x - 1);

const isEmpty = figure => !figure || figure.name === 'Figure';

const getEnemy = color => color === 'white' ? 'black' : 'white';

const getDirection = color => color === 'white' ? 1 : -1;

export function isKingInCheck(cells, color) {
    const king = cells.find(cell =>
        cell.figure?.name === 'King' &&
        cell.figure.color === color
    )?.figure;

    if (!king) return false;

    return cells.some(cell => {
        const figure = cell.figure;

        if (isEmpty(figure) || figure.color === color) {
            return false;
        }

        const attacks = figure.name === 'Pawn'
            ? figure.possibleAttacks || []
            : figure.possibleAttacks?.length
                ? figure.possibleAttacks
                : figure.possibleMoves || [];

        return attacks.some(([dx, dy]) => {
            const direction = figure.name === 'Pawn'
                ? getDirection(figure.color)
                : 1;

            const attackX = figure.x + dx;
            const attackY = figure.y + dy * direction;

            if (attackX !== king.x || attackY !== king.y) {
                return false;
            }

            return isPathClear(cells, figure, king.x, king.y);
        });
    });
}

function isPathClear(cells, figure, targetX, targetY) {
    if (
        figure.name === 'King' ||
        figure.name === 'Knight' ||
        figure.name === 'Pawn'
    ) {
        return true;
    }

    const dx = targetX - figure.x;
    const dy = targetY - figure.y;

    if (
        dx !== 0 &&
        dy !== 0 &&
        Math.abs(dx) !== Math.abs(dy)
    ) {
        return false;
    }

    const stepX = Math.sign(dx);
    const stepY = Math.sign(dy);

    let x = figure.x + stepX;
    let y = figure.y + stepY;

    while (x !== targetX || y !== targetY) {
        const cell = cells[getIndex(x, y)];

        if (!cell || !isEmpty(cell.figure)) {
            return false;
        }

        x += stepX;
        y += stepY;
    }

    return true;
}

function simulateMove(cells, figure, x, y) {
    return cells.map(cell => {
        if (cell.x === figure.x && cell.y === figure.y) {
            return { ...cell, figure: null };
        }

        if (cell.x === x && cell.y === y) {
            return {
                ...cell,
                figure: { ...figure, x, y }
            };
        }

        return cell;
    });
}

export function getAllPossibleMoves(cells, color) {
    const moves = [];

    cells.forEach(cell => {
        const figure = cell.figure;

        if (isEmpty(figure) || figure.color !== color) return;

        const isPawn = figure.name === 'Pawn';
        const direction = isPawn ? getDirection(color) : 1;

        const candidates = isPawn
            ? [
                ...(figure.possibleMoves || []).map(move => ({
                    move,
                    type: 'move'
                })),
                ...(figure.possibleAttacks || []).map(move => ({
                    move,
                    type: 'attack'
                }))
            ]
            : (figure.possibleMoves || []).map(move => ({
                move,
                type: 'move'
            }));

        candidates.forEach(({ move, type }) => {
            const dx = move[0];
            const dy = move[1] * direction;

            const x = figure.x + dx;
            const y = figure.y + dy;

            if (x < 1 || x > 8 || y < 1 || y > 8) return;

            const target = cells[getIndex(x, y)]?.figure;

            if (type === 'move' && !isEmpty(target)) return;

            if (
                type === 'attack' &&
                (isEmpty(target) || target.color === color)
            ) {
                return;
            }

            if (!isPawn && !isEmpty(target) && target.color === color) {
                return;
            }

            if (!isPathClear(cells, figure, x, y)) return;

            if (isPawn && Math.abs(dy) === 2) {
                const startY = color === 'white' ? 2 : 7;

                if (figure.y !== startY) return;

                const middle = cells[
                    getIndex(figure.x, figure.y + direction)
                    ]?.figure;

                if (!isEmpty(middle)) return;
            }

            const newCells = simulateMove(cells, figure, x, y);

            if (isKingInCheck(newCells, color)) return;

            moves.push({
                figure,
                from: {
                    x: figure.x,
                    y: figure.y
                },
                to: {
                    x,
                    y
                }
            });
        });
    });

    return moves;
}

export function isCheckmate(cells, color) {
    return (
        isKingInCheck(cells, color) &&
        getAllPossibleMoves(cells, color).length === 0
    );
}

export function isStalemate(cells, color) {
    return (
        !isKingInCheck(cells, color) &&
        getAllPossibleMoves(cells, color).length === 0
    );
}

export function getWinner(cells, color) {
    return isCheckmate(cells, color)
        ? getEnemy(color)
        : null;
}

export function isMoveSafe(cells, figure, x, y) {
    const newCells = simulateMove(cells, figure, x, y);

    return !isKingInCheck(newCells, figure.color);
}
