import React from 'react';
import { Cell } from '../../data/cell';
import CellComponent from "./cell/cellComponent";

const GameField = () => {
    const [cells, setCells] = React.useState(Array.from({length: 64}, (_, index) =>
        new Cell(index % 8, Math.floor(index / 8))));
    return (
        <div style={{
            width: 'fit-content',
            height: 'fit-content',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            border: '3px solid green',
            padding: '2px',
        }}>
            {cells.map((value, index) =>
                <CellComponent key={index.toString()} color={cells[index].getColor()} figure={cells[index].figure}/>
            )}
        </div>
    );
};

export default GameField;