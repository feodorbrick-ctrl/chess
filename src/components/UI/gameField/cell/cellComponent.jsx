import React from 'react';
import cl from './cellComponent.module.css'
import FigureSkeleton from "../../figure/figureSkeleton";
import {Figure} from "../../../data/figures/figure";

const CellComponent = ({whichFigureCanStay, color, figure}) => {
    return (
        <div className={cl.cell} style={{ backgroundColor: color }}>
            {figure !== new Figure() &&
                <FigureSkeleton figure={figure} whichFigureCanStay={whichFigureCanStay}/>
            }
        </div>
    );
};

export default CellComponent;