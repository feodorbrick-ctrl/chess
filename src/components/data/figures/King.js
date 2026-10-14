import {Figure} from "./figure";
import KingImg from '../../../images/black/king-black.png'
import {possibleMoves} from "./possibleMoves";

export class King extends Figure{
    constructor(x, y) {
        super();
        this.name = 'King';
        this.possibleMoves = possibleMoves.King.Moves;
        this.possibleAttacks = possibleMoves.King.Attacks;
        this.color = 'black'
        this._img = KingImg;
        this.x = x
        this.y = y
    }
}