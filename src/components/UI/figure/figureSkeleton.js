import React, {useContext} from 'react';
import cl from './figureSkeleton.module.css'
import {findWereFigureCanStay} from "../../../frameworks/findWereFigureCanStay";
import Context from "../../../index";

const FigureSkeleton = ({figure}) => {
    const {cells} = useContext(Context)
    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            {figure.name !== 'Figure' &&
                <button onClick={() => findWereFigureCanStay(cells, figure)} className={cl.button}></button>
            }
        </div>
    );
};

export default FigureSkeleton;