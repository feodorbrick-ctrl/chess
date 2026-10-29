import React, {useContext, useEffect} from 'react';
import cl from './figureSkeleton.module.css'
import {findWereFigureCanStay} from "../../../frameworks/findWereFigureCanStay";
import Context from "../../../index";
import {setFigureCoordinates} from "../../../frameworks/setFigureCoordinates";

const FigureSkeleton = ({figure, whichFigureCanStay}) => {
    const {cells, setCells} = useContext(Context)
    useEffect(() => {
        if (whichFigureCanStay !== null) {}
    }, [whichFigureCanStay])
    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            <button onClick={() => {
                findWereFigureCanStay(cells, figure)
                    if (whichFigureCanStay !== null) {
                        setFigureCoordinates(figure, whichFigureCanStay, cells, setCells)
                        return;
                    }


                setCells([...cells])
            }} className={cl.button}></button>
            <div className={cl.canFigureStayFlag} style={{display: whichFigureCanStay === null ? 'none' : 'block', backgroundColor: figure.name === 'Figure' && '#BBDC12'}}></div>
        </div>
    );
};

export default FigureSkeleton;