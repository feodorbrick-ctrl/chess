import {Figure} from "./figure";
import QueenImg from '../../../images/black/queen-black.png'
import {possibleMoves} from "./possibleMoves";

export class Queen extends Figure{
    constructor(x, y) {
        super();
        this.name = 'Queen';
        this.possibleMoves = possibleMoves.Queen.Moves;
        this.possibleAttacks = possibleMoves.Queen.Attacks;
        this.color = 'black'
        this._img = QueenImg;
        this.x = x
        this.y = y
    }
}