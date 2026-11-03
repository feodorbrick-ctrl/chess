
const getIndex = (x, y) => 8 * (y - 1) + (x - 1);

const isEmpty = figure => !figure || figure.name === 'Figure';

const getEnemy = color => color === 'white' ? 'black' : 'white';

const getDirection = color => color === 'white' ? 1 : -1;


// Проверка свободного пути
function isPathClear(cells, figure, dx, dy) {
    if (!['Queen', 'Rook', 'Bishop'].includes(figure.name)) {
        return true;
    }

    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    for (let i = 1; i < steps; i++) {
        const x = figure.x + Math.sign(dx) * i;
        const y = figure.y + Math.sign(dy) * i;

        if (!isEmpty(cells[getIndex(x, y)]?.figure)) {
            return false;
        }
    }

    return true;
}


// 1. Проверка шаха
export function isKingInCheck(cells, color) {
    const king = cells.find(cell =>
        cell.figure?.name === 'King' &&
        cell.figure.color === color
    )?.figure;

    if (!king) return false;

    return cells.some(cell => {
        const figure = cell.figure;

        if (isEmpty(figure) || figure.color === color) return false;

        const attacks = figure.possibleAttacks || [];
        const direction = figure.name === 'Pawn'
            ? getDirection(figure.color)
            : 1;

        return attacks.some(([dx, dy]) => {
            dx *= direction;
            dy *= direction;

            if (
                figure.x + dx !== king.x ||
                figure.y + dy !== king.y
            ) return false;

            return isPathClear(cells, figure, dx, dy);
        });
    });
}


// Создание доски после предполагаемого хода
function simulateMove(cells, figure, x, y) {
    return cells.map(cell => {
        if (cell.x === figure.x && cell.y === figure.y) {
            return {...cell, figure: null};
        }

        if (cell.x === x && cell.y === y) {
            return {
                ...cell,
                figure: {...figure, x, y}
            };
        }

        return cell;
    });
}


// 2. Все разрешённые ходы
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

        candidates.forEach(({move, type}) => {
            const dx = move[0] * direction;
            const dy = move[1] * direction;

            const x = figure.x + dx;
            const y = figure.y + dy;

            if (x < 1 || x > 8 || y < 1 || y > 8) return;

            const target = cells[getIndex(x, y)]?.figure;

            if (type === 'move' && !isEmpty(target)) return;

            if (type === 'attack' &&
                (isEmpty(target) || target.color === color)) return;

            if (!isPawn && !isEmpty(target) && target.color === color) return;

            if (!isPathClear(cells, figure, dx, dy)) return;

            // Проверяем промежуточную клетку при ходе пешки на две клетки
            if (isPawn && Math.abs(dy) === 2) {
                const middle = cells[getIndex(
                    figure.x,
                    figure.y + Math.sign(dy)
                )]?.figure;

                if (!isEmpty(middle)) return;
            }

            const newCells = simulateMove(cells, figure, x, y);

            if (isKingInCheck(newCells, color)) return;

            moves.push({
                figure,
                from: {x: figure.x, y: figure.y},
                to: {x, y}
            });
        });
    });

    return moves;
}


// 3. Проверка мата
export function isCheckmate(cells, color) {
    return isKingInCheck(cells, color) &&
        getAllPossibleMoves(cells, color).length === 0;
}


// 4. Проверка пата
export function isStalemate(cells, color) {
    return !isKingInCheck(cells, color) &&
        getAllPossibleMoves(cells, color).length === 0;
}


// 5. Определение победителя
export function getWinner(cells, color) {
    return isCheckmate(cells, color) ? getEnemy(color) : null;
}
