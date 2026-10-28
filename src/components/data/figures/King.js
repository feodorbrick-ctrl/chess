import {Figure} from "./figure";
import BlackKingImg from '../../../images/black/king-black.png'
import WhiteKingImg from '../../../images/white/king-white.webp'
import {possibleMoves} from "./possibleMoves";

export class King extends Figure{
    constructor(x, y, color = 'black') {
        super();
        this.name = 'King';
        this.possibleMoves = possibleMoves.King.Moves;
        this.possibleAttacks = possibleMoves.King.Attacks;
        this._img = color === 'black' ? BlackKingImg : WhiteKingImg;
        this.x = x
        this.y = y
    }
}