import {Figure} from "./figure";
import RookImg from '../../../images/black/rook-black.png'
import {possibleMoves} from "./possibleMoves";

export class Rook extends Figure{
    constructor() {
        super();
        this.name = 'Rook';
        this.possibleMoves = possibleMoves.Rook.Moves;
        this.possibleAttacks = possibleMoves.Rook.Attacks;
        this.color = 'black'
        this._img = RookImg;
    }
}