import React from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/chess')}>chess</button>
        </div>
    );
};

export default Home;