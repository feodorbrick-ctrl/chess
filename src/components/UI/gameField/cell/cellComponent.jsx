import React from 'react';
import cl from './cellComponent.module.css'

const CellComponent = ({color, figure}) => {
    return (
        <div className={cl.cell} style={{ backgroundColor: color }}>
            {`${figure}`}
        </div>
    );
};

export default CellComponent;