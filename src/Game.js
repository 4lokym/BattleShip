import { Player } from "./Player";
import { Gameboard } from "./Gameboard";

export const game = function(){
  const boards = document.querySelectorAll(".board");

  const domGameBoard = new DOMGameBoard(1, 2);
  const boardG = new Gameboard();
  boards.forEach((board) => {
    domGameBoard.printBoard(domGameBoard.buildBoard(boardG.grid), board)
  })

  boards[0].querySelector("#R3C4").classList.add("ship");
  boards[0].querySelector("#R3C4").classList.add("sunk");
  boards[0].querySelector("#R5C4").classList.add("sunk");
  boards[0].querySelector("#R4C4").classList.add("ship");
  boards[0].querySelector("#R5C4").classList.add("ship");
  boards[0].querySelector("#R5C5").classList.add("miss");
  boards[0].querySelector("#R5C6").classList.add("miss");
}

export class DOMGameBoard{

  constructor(Player1, Player2){
    this.Player1 = Player1;
    this.Player2 = Player2;
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


}
