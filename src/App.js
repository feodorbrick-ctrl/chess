import cl from './styles/App.module.css'
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <div className={cl.App}>
            <AppRouter/>
        </div>
    );
}

export default App;