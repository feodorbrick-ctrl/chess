import React, {useContext} from 'react';
import GameField from "../components/UI/gameField/gameField";
import Confetti from "../components/UI/Confitti/confetti";
import cl from "../styles/App.module.css";
import Context from "../index";

const ChessGameInOneBrowser = () => {
    const {isConfettiVisible, whoIsGoing} = useContext(Context);
    return (
        <div className={cl.App}>
            <GameField/>
            <Confetti count={100} active={isConfettiVisible}/>
            {isConfettiVisible &&
                <h1 className={cl.winText}>{whoIsGoing === 'white' ? 'black' : 'white'} are winner</h1>
            }
        </div>
    );
};

export default ChessGameInOneBrowser;