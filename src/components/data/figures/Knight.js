import {Figure} from "./figure";
import BlackKnightImg from '../../../images/black/knight-black.png'
import WhiteKnightImg from '../../../images/white/knight-white.png'
import {possibleMoves} from "./possibleMoves";

export class Knight extends Figure{
    constructor(x, y, color = 'black') {
        super();
        this.name = 'Knight';
        this.possibleMoves = possibleMoves.Knight.Moves;
        this.possibleAttacks = possibleMoves.Knight.Attacks;
        this._img = color === 'black' ? BlackKnightImg : WhiteKnightImg;
        this.x = x
        this.y = y
    }
}