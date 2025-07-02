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

// TODO 1) create a position check function, 2) add a position controll in atPos() & receiveAttack(), 
// 3) Make unit test for receiveAttack() using a jest.mock Ship object (like explained in the video)

  atPos(x, y) {
    return this.grid[x][y];
  }

  receiveAttack(x, y){
    const cell = this.grid[x][y]
    if(typeof this.grid[x][y] === "Ship"){
      cell.hitIncr();
      cell.updateSunk();
    }else{
      this.grid[x][y] = {miss: true};
    }
    return this.grid[x][y];
  }

}
