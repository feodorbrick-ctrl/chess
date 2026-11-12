import React, {useState, useRef, useEffect} from 'react';
import cl from './makeRoomZome.module.css';
import {WebRTC} from '../../../frameworks/webRTC';
import {useNavigate} from "react-router-dom";

const MakeRoomZone = () => {
    const [offerInput, setOfferInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const [connectionData, setConnectionData] = useState('');
    const navigate = useNavigate();
    const [isDeviseConnected, setIsDeviseConnected] = useState(null);

    const webRTC = useRef(null);

    if (webRTC.current === null) {
        webRTC.current = new WebRTC(setIsDeviseConnected);
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
        } catch(e) {
            console.log(e)
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

    useEffect(() => {
        if (isDeviseConnected === true) {
            navigate('/chess');
        } else if (isDeviseConnected === false) {
            navigate('/');
        }
    }, [isDeviseConnected, navigate]);

    return (
        <div className={cl.makeRoom}>
            step 1. write in second device
            <button onClick={createRoom}>Create offer of new room</button>
            {connectionData !== '' &&
                <input placeholder="Your offer" value={connectionData} readOnly/>
            }
            { connectionData === '' &&
                <div style={{display:'grid'}}>
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