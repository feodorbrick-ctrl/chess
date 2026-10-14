import {Figure} from "./figure";
import KnightImg from '../../../images/black/knight-black.png'
import {possibleMoves} from "./possibleMoves";

export class Knight extends Figure{
    constructor(x, y) {
        super();
        this.name = 'Knight';
        this.possibleMoves = possibleMoves.Knight.Moves;
        this.possibleAttacks = possibleMoves.Knight.Attacks;
        this.color = 'black'
        this._img = KnightImg;
        this.x = x
        this.y = y
    }
}