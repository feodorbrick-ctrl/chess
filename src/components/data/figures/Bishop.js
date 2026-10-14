import {Figure} from "./figure";
import BishopImg from '../../../images/black/bishop-black.png'
import {possibleMoves} from "./possibleMoves";

export class Bishop extends Figure{
    constructor(x, y) {
        super();
        this.name = 'Bishop';
        this.possibleMoves = possibleMoves.Knight.Moves;
        this.possibleAttacks = possibleMoves.Knight.Attacks;
        this.color = 'black'
        this._img = BishopImg;
        this.x = x
        this.y = y
    }
}