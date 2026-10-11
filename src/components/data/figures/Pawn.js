import {Figure} from "./figure";
import PawnImg from '../../../images/black/pawn-black.png'

export class Pawn extends Figure{
    constructor() {
        super();
        this.name = 'Pawn';
        this.possibleMoves = [];
        this.possibleAttacks = []
        this.color = 'black'
        this._img = PawnImg;
    }
}