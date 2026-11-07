import React from 'react';
import cl from './chooseFigure.module.css';
import { Queen } from '../../data/figures/Queen';
import { Rook } from '../../data/figures/Rook';
import { Knight } from '../../data/figures/Knight';
import { Bishop } from '../../data/figures/Bishop';

const OPTIONS = [
    { name: 'Queen',  file: new Queen()._img,  Ctor: Queen },
    { name: 'Rook',   file: new Rook()._img,   Ctor: Rook },
    { name: 'Knight', file: new Knight()._img, Ctor: Knight },
    { name: 'Bishop', file: new Bishop()._img, Ctor: Bishop },
];

const ChooseFigure = ({ pawn, onChoose, cells, setCells }) => {

    return (
        <div className={cl.picker}>
            <h2 className={cl.title}>Choose a figure</h2>
            <div className={cl.options}>
                {OPTIONS.map(({ name, file, Ctor }) => (
                    <button
                        key={name}
                        type="button"
                        className={cl.option}
                        title={name}
                        onClick={() => onChoose(pawn, new Ctor(pawn.x, pawn.y, pawn.color), cells, setCells)}
                    >
                        <img
                            className={cl.image}
                            src={file}
                            alt={name}
                            draggable={false}
                        />
                        <span className={cl.label}>{name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChooseFigure;