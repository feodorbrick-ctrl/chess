import Home from "../pages/home";
import ChessGameInOneBrowser from "../pages/chessGameInOneBrowser";

export const router = [
    {path:  '/', name: '', component: <Home/>},
    {path: '/chess', name: 'chess', component: <ChessGameInOneBrowser/>},
]