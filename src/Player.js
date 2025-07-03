import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

export class Player{
  constructor (gameboard){
    this.gameboard = gameboard;
  }
}

export class autoPlayer extends Player{
  constructor(gameboard){
    super(gameboard);
  }
}