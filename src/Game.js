import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

export const game = function(){
  const boards = document.querySelectorAll(".board");

  const [player1, player2] = [new Player(new Gameboard), new Player(new Gameboard)];
  const domGamb = new DOMGameBoard(player1);
  
  domGamb.updateBoard(boards[0]);

  player1.gameboard.place(3, 5, new Ship(3,true));
  player1.gameboard.receiveAttack(3, 5);
  player1.gameboard.receiveAttack(3, 8);
  

  setTimeout(() => {domGamb.updateBoard(boards[0])}, 0)
  domGamb.updateBoard(boards[1]);


  // boards[0].querySelector("#R3C4").classList.add("ship");
  // boards[0].querySelector("#R3C4").classList.add("sunk");
  // boards[0].querySelector("#R5C4").classList.add("sunk");
  // boards[0].querySelector("#R4C4").classList.add("ship");
  // boards[0].querySelector("#R5C4").classList.add("ship");
  // boards[0].querySelector("#R5C5").classList.add("miss");
  // boards[0].querySelector("#R5C6").classList.add("miss");
}

export class DOMGameBoard{

  constructor(player = {}){
    this.player = player
  }

  fromCellToDOM(cell){
    const domCell = document.createElement("div");
    domCell.classList.add("cell");

    if(cell && Object.hasOwn(cell, "miss")){
      domCell.classList.add("miss");
    }else if(cell && Object.hasOwn(cell, "sunk")){
      domCell.classList.add("ship");
      if(cell.sunk){
        domCell.classList.add("sunk");
      }
    }
    return domCell;
  }

  buildBoard(board){
    const list = [];
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        let cell = this.fromCellToDOM(board[i][j]);
        cell.id = `R${i}C${j}`;
        list.push(cell);
      }
    }
    return list;
  }

  printBoard(list, DOMContainer){
    for(let i = 0; i< list.length; i++){
      DOMContainer.appendChild(list[i]);
    }
    return this;
  }

  removeBoard(DOMContainer){
    DOMContainer.innerHTML = "";
  }

  updateBoard(DOMContainer){
    this.removeBoard(DOMContainer);
    const board = this.player.gameboard.grid;
    this.printBoard(this.buildBoard(board), DOMContainer);
  }

}
