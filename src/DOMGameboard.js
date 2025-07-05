import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

export class DOMGameBoard {
  constructor(player = {}, DOMContainer) {
    this.player = player;
    this.DOMContainer = DOMContainer;
  }

  fromCellToDOM(cell, hidden = false) {
    const cellClicked = document.createElement("div");
    cellClicked.classList.add("cell");

    if (cell && Object.hasOwn(cell, "miss")) {
      cellClicked.classList.add("miss");
    } else if (cell && Object.hasOwn(cell, "sunk")) {
      if (!hidden) {
        cellClicked.classList.add("ship");
      }
      if (cell.sunk) {
        cellClicked.classList.add("ship");
        cellClicked.classList.add("sunk");
      }
    }
    return cellClicked;
  }

  buildBoard(board, hidden = false) {
    const list = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        let cell = this.fromCellToDOM(board[i][j], hidden);
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
