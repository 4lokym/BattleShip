import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";


export class DOMGameBoard{

  constructor(player = {}){
    this.player = player
  }

  fromCellToDOM(cell, hidden = false){
    const domCell = document.createElement("div");
    domCell.classList.add("cell");

    if(cell && Object.hasOwn(cell, "miss")){
      domCell.classList.add("miss");
    }else if(cell && Object.hasOwn(cell, "sunk")){
      if(!hidden){
        domCell.classList.add("ship");
      }
      if(cell.sunk){
        domCell.classList.add("ship");
        domCell.classList.add("sunk");
      }
    }
    return domCell;
  }

  buildBoard(board, hidden = false){
    const list = [];
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        let cell = this.fromCellToDOM(board[i][j], hidden);
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

  updateBoard(DOMContainer, hidden = false){
    this.removeBoard(DOMContainer);
    const board = this.player.gameboard.grid;
    this.printBoard(this.buildBoard(board, hidden), DOMContainer);
  }


}
