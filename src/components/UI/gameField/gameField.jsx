import React, {useContext, useEffect} from 'react';
import CellComponent from "./cell/cellComponent";
import Context from "../../../index";
import {useLocation} from "react-router-dom";
import {startFigures} from "../../data/startFigures";

const GameField = () => {
    const {cells, setCells, setWhoIsGoing} = useContext(Context)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/chess') {
            setCells(startFigures)
            setWhoIsGoing('white')
        }
    }, [location, setCells, setWhoIsGoing])

    return (
        <div style={{
            width: 'fit-content',
            height: 'fit-content',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            border: '3px solid green',
            padding: '2px',
            backgroundColor: 'white',
        }}>
            {cells.map((value, index) =>
                <CellComponent key={index.toString()} whichFigureCanStay={cells[index].whichFigureCanStay} i={index} color={cells[index].getColor()} figure={cells[index].figure}/>
            )}
        </div>
    );
};

export default GameField;