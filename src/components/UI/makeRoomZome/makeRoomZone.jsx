import React, {useState, useRef} from 'react';
import cl from './makeRoomZome.module.css';
import {WebRTC} from '../../../frameworks/webRTC';

const MakeRoomZone = () => {
    const [offerInput, setOfferInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const [connectionData, setConnectionData] = useState('');

    const webRTC = useRef(new WebRTC());

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
        const offer = JSON.parse(offerInput);

        const answer = await webRTC.current.joinRoom(offer);

        setAnswerInput(JSON.stringify(answer));
    };

    const connect = async () => {
        const answer = JSON.parse(answerInput);
        await webRTC.current.connect(answer);
        if (webRTC.current.channel.connected) {
            console.log('yep')
        }
    };

    return (
        <div className={cl.makeRoom}>
            step 1. write in second device
            <button onClick={createRoom}>Create offer of new room</button>
            {connectionData !== '' &&
                <input placeholder="Your offer" value={connectionData} readOnly/>
            }

            <hr/>
            step 2. click 'Join to created <br/> room' after write first offer
            <input placeholder="Write offer for game" value={offerInput} onChange={(e) => setOfferInput(e.target.value)}
            />
            <button onClick={joinRoom}>Join to created room</button>

            <hr/>
            step 3. write in second device
            <input placeholder="Answer" value={answerInput} onChange={e => setAnswerInput(e.target.value)}
            />
            <button onClick={connect}>Connect</button>
        </div>
    );
};
export default MakeRoomZone;