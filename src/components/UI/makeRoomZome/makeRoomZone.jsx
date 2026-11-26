import React, {useState, useEffect, useContext} from 'react';
import cl from './makeRoomZome.module.css';
import {WebRTC} from '../../../frameworks/webRTC';
import {useNavigate} from "react-router-dom";
import Context from "../../../index";
import {setFigureCoordinates} from "../../../frameworks/setFigureCoordinates";

const MakeRoomZone = () => {
    const {isDeviceConnected, setIsDeviceConnected, setWhoIsGoing, webRTC, cells, setCells, setWhatColorAmI, whoIsGoing, whatColorAmI} = useContext(Context);
    const [offerInput, setOfferInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const [connectionData, setConnectionData] = useState('');
    const navigate = useNavigate();

    const moveFigure = async (whichFigureCanStayI, figureI) => {
        const figure = cells[figureI];
        const whichFigureCanStay = cells[whichFigureCanStayI];

        await setFigureCoordinates(figure.figure, whichFigureCanStay.figure, cells, setCells, false)
    }

    const createRoom = async () => {
        await webRTC.current.createRoom();
        webRTC.current.peer.onicecandidate = event => {

            if (!event.candidate) {
                setConnectionData(
                    JSON.stringify(webRTC.current.peer.localDescription)
                );
            }
        };
    };
    const joinRoom = async () => {
        try {
            const offer = JSON.parse(offerInput);

            const answer = await webRTC.current.joinRoom(offer);

            setAnswerInput(JSON.stringify(answer));
        } catch (e) {
            console.log(e);
        }
    };
    const connect = async () => {

        try {
            const answer = JSON.parse(answerInput);
            await webRTC.current.connect(answer);
        } catch (error) {
            console.log(error);
        }
    };

    if (webRTC.current === null) {
        webRTC.current = new WebRTC(setIsDeviceConnected, setWhoIsGoing, moveFigure, setWhatColorAmI);
    }

    useEffect(() => {
        if (isDeviceConnected === true) {
            navigate('/chess');
            setWhoIsGoing('white')
        }
    }, [isDeviceConnected, navigate, setWhoIsGoing]);

    useEffect(() => console.log(whoIsGoing, whatColorAmI), [whoIsGoing, whatColorAmI])

    return (
        <div className={cl.makeRoom}>
            step 1. write in second device
            <button onClick={createRoom}>Create offer of new room</button>
            {connectionData !== '' &&
                <input placeholder="Your offer" value={connectionData} readOnly/>
            }
            {connectionData === '' &&
                <div style={{display: 'grid'}}>
                    <hr/>
                    step 2. click 'Join to created <br/> room' after write first offer
                    <input placeholder="Write offer for game" value={offerInput}
                           onChange={(e) => setOfferInput(e.target.value)}
                    />
                    <button onClick={() => offerInput && joinRoom()}>Join to created room</button>
                </div>
            }

            <hr/>
            step 3. write in second device
            <input placeholder="Answer" value={answerInput} onChange={e => setAnswerInput(e.target.value)}
            />
            <button onClick={() => answerInput && connect()}>Connect</button>
        </div>
    );
};
export default MakeRoomZone;
