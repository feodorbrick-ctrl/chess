import React, {useContext, useEffect} from 'react';
import cl from './figureSkeleton.module.css'
import {findWereFigureCanStay} from "../../../frameworks/findWereFigureCanStay";
import Context from "../../../index";
import {setFigureCoordinates} from "../../../frameworks/setFigureCoordinates";
import {startFigures} from "../../data/startFigures";

const FigureSkeleton = ({figure, whichFigureCanStay}) => {
    const {cells, setCells, whoIsGoing, setWhoIsGoing} = useContext(Context)
    useEffect(() => {
        if (whichFigureCanStay !== null) {
        }
    }, [whichFigureCanStay])
    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            <button onClick={() => {
                findWereFigureCanStay(cells, figure)
                if (whichFigureCanStay !== null) {
                    if (figure.name === 'King') {
                        console.log(`${figure.color} are dead`)
                        setWhoIsGoing('white')
                        setTimeout(() => setCells(startFigures), 1500)
                        return;
                    }
                    if (whoIsGoing === whichFigureCanStay.color) {
                        setFigureCoordinates(figure, whichFigureCanStay, cells, setCells)
                        setWhoIsGoing(whoIsGoing !== 'black' ? 'black' : 'white')
                        return;
                    }
                }


                setCells([...cells])
            }} className={cl.button}></button>
            <div className={cl.canFigureStayFlag} style={{
                display: whichFigureCanStay === null ? 'none' : 'block',
                backgroundColor: figure.name === 'Figure' && '#BBDC12'
            }}></div>
        </div>
    );
};

export default FigureSkeleton;