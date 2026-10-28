import {Figure} from "./figure";
import WhiteQueenImg from '../../../images/white/queen-white.png'
import BlackQueenImg from '../../../images/black/queen-black.png'
import {possibleMoves} from "./possibleMoves";

export class Queen extends Figure{
    constructor(x, y, color = 'black') {
        super(x, y, color);
        this.name = 'Queen';
        this.possibleMoves = possibleMoves.Queen.Moves;
        this.possibleAttacks = possibleMoves.Queen.Attacks;
        this._img = color === 'black' ? BlackQueenImg : WhiteQueenImg;
        this.x = x
        this.y = y
    }
}