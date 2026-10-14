import React, {useContext} from 'react';
import CellComponent from "./cell/cellComponent";
import Context from "../../../index";

const GameField = () => {
    const {cells} = useContext(Context)

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