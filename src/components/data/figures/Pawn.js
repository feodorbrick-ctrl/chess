import {Figure} from "./figure";
import BlackPawnImg from '../../../images/black/pawn-black.png'
import WhitePawnImg from '../../../images/white/pawn-white.webp'
import {possibleMoves} from "./possibleMoves";

export class Pawn extends Figure{
    constructor(x, y, color = 'black') {
        super();
        this.name = 'Pawn';
        this.possibleMoves = possibleMoves.Pawn.Moves;
        this.possibleAttacks = possibleMoves.Pawn.Attacks;
        this._img = color === 'black' ? BlackPawnImg : WhitePawnImg;
        this.x = x
        this.y = y
    }
}