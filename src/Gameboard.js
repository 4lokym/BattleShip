export class Gameboard {
  constructor() {
    const temp = new Array(10);
    for (let i = 0; i < 10; i++) {
      temp[i] = new Array(10);
    }

    this.grid = temp;
  }

  #placeNoLimits(x, y, ship, length = 1, horizontal = true) {
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        this.grid[x + i][y] = ship;
      } else {
        this.grid[x][y + i] = ship;
      }
    }
    return this;
  }

  posValid(x, y) {
    if (x >= this.grid.length || x < 0 || y >= this.grid[0].length || y < 0) {
      return false;
    }
    return true;
  }

  place(x, y, ship, horizontal = true) {
    if (
      (horizontal && !this.posValid(ship.length - 1 + x, y)) ||
      (!horizontal && !this.posValid(x, ship.length - 1 + y))
    ) {
      throw new Error("Ship out of the board");
    } else {
      return this.#placeNoLimits(x, y, ship, ship.length, horizontal);
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
    if (!cell || cell.miss){
      this.grid[x][y] = { miss: true };
    }else if (cell.sunk){
    }else {
      cell.hitIncr();
      cell.updateSunk()
     }
    return this.grid[x][y];
  }
}
