import {Figure} from "./figure";
import WhiteBishopImg from '../../../images/white/bishop-white.webp'
import BlackBishopImg from '../../../images/black/bishop-black.png'
import {possibleMoves} from "./possibleMoves";

export class Bishop extends Figure{
    constructor(x, y) {
        super();
        this.name = 'Bishop';
        this.possibleMoves = possibleMoves.Knight.Moves;
        this.possibleAttacks = possibleMoves.Knight.Attacks;
        this.color = 'black'
        this._img = this.color === 'black' ? BlackBishopImg : WhiteBishopImg
        this.x = x
        this.y = y
    }
}