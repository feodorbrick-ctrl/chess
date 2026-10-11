import {Figure} from "./figure";
import PawnImg from '../../../images/black/pawn-black.png'
import {possibleMoves} from "./possibleMoves";

export class Pawn extends Figure{
    constructor() {
        super();
        this.name = 'Pawn';
        this.possibleMoves = possibleMoves.Pawn.Moves;
        this.possibleAttacks = possibleMoves.Pawn.Attacks;
        this.color = 'black'
        this._img = PawnImg;
    }
}