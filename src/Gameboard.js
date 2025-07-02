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

  place(x, y, ship, horizontal = true) {
    if (
      (horizontal && ship.length + x > this.grid.length) ||
      (!horizontal && ship.length + y > this.grid[0].length)
    ) {
      throw new Error("Ship out of the board");
    } else {
      return this.#placeNoLimits(x, y, ship, ship.length, horizontal);
    }
  }

  atPos(x, y) {
    return this.grid[x][y];
  }
}
