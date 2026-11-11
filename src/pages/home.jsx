import React from 'react';
import {useNavigate} from "react-router-dom";
import cl from '../styles/homeStyle.module.css'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.home}>
            <button onClick={() => navigate('/chess')}>play in one device</button>
            <button onClick={() => navigate('/chess')}>play online</button>
        </div>
    );
};

export default Home;