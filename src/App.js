import cl from './styles/App.module.css'
import AppRouter from "./components/AppRouter";
import {useContext} from "react";
import Context from "./index";
import {useLocation, useNavigate} from "react-router-dom";

function App() {
    const {webRTC, isDeviceConnected} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className={cl.App}>
            {location.pathname !== '/' &&
                <button className={cl.backButton} onClick={() => {
                    if (isDeviceConnected) {
                        webRTC.current.close()
                    }
                    navigate('/')
                }}>Back</button>
            }
            <AppRouter/>
        </div>
    );
}

export default App;