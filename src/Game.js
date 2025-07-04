import { Player } from "./Player";
import { Gameboard } from "./Gameboard";

export const game = function(){
  const boards = document.querySelectorAll(".board");

  boards.forEach((board) => {
    for(let i = 0; i< 10; i++){
      for(let j = 0; j < 10; j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `R${i}C${j}`;
        board.appendChild(cell);
      }
    }
    console.log([...board.querySelectorAll("div")][15].id);
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

    if(cell.hasOwn("miss")){
      domCell.classList.add("miss");
    }else if(cell.hasOwn("sunk")){
      domCell.classList.add("ship");
      if(cell.sunk){
        domCell.classList.add("sunk");
      }
    }
    return domCell;
  }

  printBoard(board){
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `R${i}C${j}`;
        board.appendChild(cell);
      }
    }

  }


}
