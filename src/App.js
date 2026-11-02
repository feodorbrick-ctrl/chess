import GameField from "./components/UI/gameField/gameField";
import Confetti from "./components/UI/Confitti/confetti";
import {useContext} from "react";
import cl from './App.module.css'
import Context from "./index";

function App() {
    const {isConfettiVisible, whoIsGoing} = useContext(Context);
    return (
        <div className={cl.App}>
            <GameField/>
            <Confetti count={100} active={isConfettiVisible}/>
            {whoIsGoing !== 'black' && whoIsGoing !== 'white' &&
                <h1 className={cl.winText}>{whoIsGoing}is win</h1>
            }
        </div>
    );
}

export default App;