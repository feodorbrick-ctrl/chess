import React from 'react';
import cl from './figureSkeleton.module.css'

const FigureSkeleton = ({figure}) => {
    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            {figure.name !== 'Figure' &&
                <button className={cl.button}></button>
            }
        </div>
    );
};

export default FigureSkeleton;