import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {startFigures} from "./components/data/startFigures";

const root = ReactDOM.createRoot(document.getElementById('root'));
const Context = createContext(null);
const ContextProvider = (props) => {

    const [cells, setCells] = React.useState(() => [...startFigures]);

    const [whoIsGoing, setWhoIsGoing] = React.useState('white');

    const contextValue = {
        cells,
        setCells,
        whoIsGoing,
        setWhoIsGoing,
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
root.render(
  <React.StrictMode>
      <ContextProvider>
          <App />
      </ContextProvider>
  </React.StrictMode>
);

export default Context