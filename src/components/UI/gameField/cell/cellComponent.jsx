import React, {useContext, useEffect} from 'react';
import cl from './cellComponent.module.css'
import FigureSkeleton from "../../figure/figureSkeleton";
import {Figure} from "../../../data/figures/figure";
import {setFigureCoordinates} from "../../../../frameworks/setFigureCoordinates";
import {Queen} from "../../../data/figures/Queen";
import Context from "../../../../index";
import Modal from "../../modal/modal";
import ChooseFigure from "../../chooseFigure/chooseFigure";

const CellComponent = ({whichFigureCanStay, color, figure}) => {
    const {cells, setCells} = useContext(Context);
    const [isModalVisible, setModalVisible] = React.useState(false);
    useEffect(() => {
        if (figure.name === 'Pawn' && (figure.y === 8 || figure.y === 1)) {
            setModalVisible(true);
            // setFigureCoordinates(figure, new Queen(figure.x, figure.y, figure.color), cells, setCells)
        }
    }, [figure]);
    return (
        <div className={cl.cell} style={{ backgroundColor: color }}>
            <Modal children={<ChooseFigure pawn={figure} onChoose={setFigureCoordinates} cells={cells} setCells={setCells}/>} visible={isModalVisible} setVisible={setModalVisible}/>
            {figure !== new Figure() &&
                <FigureSkeleton figure={figure} whichFigureCanStay={whichFigureCanStay}/>
            }
        </div>
    );
};

export default CellComponent;
