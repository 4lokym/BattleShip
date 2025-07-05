import { Ship } from "./Ship";

export class Gameboard {
  
  constructor() {
    const temp = new Array(10);
    for (let i = 0; i < 10; i++) {
      temp[i] = new Array(10);
    }

    this.grid = temp;
  }

  #placeNoLimits(x, y, shipCells, length = 1, vertical = true) {
    for (let i = 0; i < length; i++) {
      if (vertical) {
        this.grid[x + i][y] = shipCells[i];
      } else {
        this.grid[x][y + i] = shipCells[i];
      }
    }
    return this;
  }

  posValid(x, y) {
    if (x >= this.grid.length || x < 0 || y >= this.grid[0].length || y < 0) {
      return false
    }
    if(this.grid[x][y]){
      return false;
    }
    return true;
  }

  place(x, y, ship, vertical = true) {
    if (
      (vertical && !this.posValid(ship.length - 1 + x, y)) ||
      (!vertical && !this.posValid(x, ship.length - 1 + y)) ||
      (!this.posValid(x,y))
    ) {
    } else {
      return this.#placeNoLimits(x, y, ship.status, ship.length, vertical);
    }
  }

  atPos(x, y) {
    if (this.posValid(x, y)) {
      return this.grid[x][y];
    }else{
      throw new Error("Coordinates out of the board");
    }
  }

  receiveAttack(x, y) {
    const cell = this.grid[x][y];
    if (!cell){
      this.grid[x][y] = { miss: true };
    }else if (cell.sunk){
    }else {
      cell.ship.hitShip(cell.offset);
    }
    return this.grid[x][y];
  }

  allSunk(){
    for(let i = 0; i < this.grid.length; i++){
      for(let j= 0; j < this.grid[0].length; j++){
        if(this.grid[i][j] && this.grid[i][j].ship && this.grid[i][j].ship.sunk === false){
          return false;
        }
      }
    }
    return true;
  }
}
