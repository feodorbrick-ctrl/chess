import Home from "../pages/home";
import ChessGameInOneBrowser from "../pages/chessGameInOneBrowser";
import MakeRoom from "../pages/makeRoom";

export const router = [
    {path:  '/', name: '', component: <Home/>},
    {path: '/chess', name: 'chess', component: <ChessGameInOneBrowser/>},
    {path: '/make-room', name: 'room', component: <MakeRoom/>}
]