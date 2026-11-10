
import React, {useContext, useEffect} from 'react';
import cl from './figureSkeleton.module.css';
import {findWereFigureCanStay} from "../../../frameworks/findWereFigureCanStay";
import Context from "../../../index";
import {setFigureCoordinates} from "../../../frameworks/setFigureCoordinates";
import {startFigures} from "../../data/startFigures";
import {getWinner} from "../../../frameworks/gameRules";

const FigureSkeleton = ({figure, whichFigureCanStay}) => {
    const {cells, setCells, whoIsGoing, setWhoIsGoing, setConfettiVisible} = useContext(Context);
    useEffect(() => {
        const winner = getWinner(cells, whoIsGoing);

        if (!winner) return;

        console.log(winner + ' wins!');

        setConfettiVisible(true);
        setWhoIsGoing(null);

        setTimeout(() => {
            setWhoIsGoing('white');
            setConfettiVisible(false);
            setCells([...startFigures]);
        }, 5000);

    }, [cells, whoIsGoing]);

    return (
        <div className={cl.figure}>
            {figure.name !== 'Figure' &&
                <img className={cl.img} src={figure._img} alt={figure.name}/>
            }
            <button
                onClick={() => {
                    findWereFigureCanStay(cells, figure, whoIsGoing);

                    if (whichFigureCanStay !== null) {
                        if (whoIsGoing === whichFigureCanStay.color) {
                            setFigureCoordinates(
                                figure,
                                whichFigureCanStay,
                                cells,
                                setCells
                            );
                            setWhoIsGoing(
                                whoIsGoing !== 'black' ? 'black' : 'white'
                            );
                            return;
                        }
                    }
                    setCells([...cells]);
                }}
                className={cl.button}
                style={{
                    cursor: figure.color === whoIsGoing && 'pointer'
                }}
            />
            <div
                className={cl.canFigureStayFlag}
                style={{
                    display: whichFigureCanStay === null ? 'none' : 'block',
                    backgroundColor: figure.name === 'Figure' && '#BBDC12'
                }}
            />
        </div>
    );
};

export default FigureSkeleton;