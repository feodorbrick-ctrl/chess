import {Figure} from "./figure";
import WhiteBishopImg from '../../../images/white/bishop-white.webp'
import BlackBishopImg from '../../../images/black/bishop-black.png'
import {possibleMoves} from "./possibleMoves";

export class Bishop extends Figure{
    constructor(x, y, color = 'black') {
        super(x, y, color);
        this.name = 'Bishop';
        this.possibleMoves = possibleMoves.Bishop.Moves;
        this.possibleAttacks = possibleMoves.Bishop.Attacks;
        this._img = color === 'black' ? BlackBishopImg : WhiteBishopImg
        this.x = x
        this.y = y
    }
}
