import React, {useContext} from 'react';
import cl from './figureSkeleton.module.css'
import {findWereFigureCanStay} from "../../../frameworks/findWereFigureCanStay";
import Context from "../../../index";
import {setFigureCoordinates} from "../../../frameworks/setFigureCoordinates";

const FigureSkeleton = ({figure, whichFigureCanStay}) => {
    const {cells, setCells} = useContext(Context)
    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            <button onClick={() => {
                findWereFigureCanStay(cells, figure)
                if (figure.name === 'Figure') {
                    if (whichFigureCanStay !== null) {
                        setFigureCoordinates(figure, whichFigureCanStay, cells, setCells)
                    }

                }
                setCells([...cells])
            }} className={cl.button}></button>
        </div>
    );
};

export default FigureSkeleton;