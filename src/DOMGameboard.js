import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

export class DOMGameBoard {
  constructor(player = {}, DOMContainer) {
    this.player = player;
    this.DOMContainer = DOMContainer;
  }

  fromCellToDOM(cell, hidden = false, disabled = false) {
    const domCell = document.createElement("div");
    domCell.classList.add("cell");
    domCell.classList.add("cell-hov");
    domCell.classList.add("cell-act");

    if (cell && Object.hasOwn(cell, "miss")) {
      domCell.classList.add("miss");
    } else if (cell && Object.hasOwn(cell, "sunk")) {
      if (!hidden) {
        domCell.classList.add("ship");
      }
      if (cell.sunk) {
        domCell.classList.add("ship");
        domCell.classList.add("sunk");
      }
    }
    if(disabled){
      DOMGameBoard.cellDisable(domCell);
    }
    return domCell;
  }

  static cellDisable(cell){
    cell.classList.remove("cell-hov");
    cell.classList.remove("cell-act");
  }

  static cellEnable(cell){
    cell.classList.add("cell-hov");
    cell.classList.add("cell-act");
  }

  buildBoard(board, hidden = false, disabled = false) {
    const list = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        let cell = this.fromCellToDOM(board[i][j], hidden, disabled);
        cell.id = `RC${i}${j}`;
        list.push(cell);
      }
    }
    return list;
  }

  printBoard(list, DOMContainer = this.DOMContainer) {
    for (let i = 0; i < list.length; i++) {
      DOMContainer.appendChild(list[i]);
    }
    return this;
  }

  removeBoard(DOMContainer = this.DOMContainer) {
    DOMContainer.innerHTML = "";
  }

  updateBoard(hidden = false, DOMContainer = this.DOMContainer) {
    this.removeBoard(DOMContainer);
    const board = this.player.gameboard.grid;
    this.printBoard(this.buildBoard(board, hidden), DOMContainer);
  }

  updateWhiteBoard(disabled){
    this.removeBoard(this.DOMContainer);
    const list = new Array(10);
    for(let i = 0; i < list.length; i++){
      list[i] = new Array(10);
    }
    this.printBoard(this.buildBoard(list, false, disabled), this.DOMContainer);
  }

  clickable(cellClicked) {
    return (
      cellClicked.classList.contains("cell") &&
      !cellClicked.classList.contains("sunk") &&
      !cellClicked.classList.contains("miss")
    );
  }

  getIdFromDomCell(cell){
    if(!cell){
      return false;
    }
    return [cell.id.slice(2, 3), cell.id.slice(3)];
  }

  click(cellClicked) {
    if (this.clickable(cellClicked)) {
      const [x, y] = this.getIdFromDomCell(cellClicked);
      this.player.gameboard.receiveAttack(x, y);
      this.updateBoard(true);
    }
  }

}

