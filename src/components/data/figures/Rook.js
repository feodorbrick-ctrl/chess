import {Figure} from "./figure";
import WhiteRookImg from '../../../images/white/rook-white.webp'
import BlackRookImg from '../../../images/black/rook-black.png'
import {possibleMoves} from "./possibleMoves";

export class Rook extends Figure{
    constructor(x, y, color = 'black') {
        super();
        this.name = 'Rook';
        this.possibleMoves = possibleMoves.Rook.Moves;
        this.possibleAttacks = possibleMoves.Rook.Attacks;
        this._img = color === 'black' ? BlackRookImg : WhiteRookImg;
        this.x = x
        this.y = y
    }
}