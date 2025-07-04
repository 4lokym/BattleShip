import { Gameboard } from "../src/Gameboard";
import {Ship} from "../src/Ship"

beforeEach(() => {
  aBoard = new Gameboard();
  shipMock = new Ship();
  shipMock.length = 1;
  [x, y] = [4, 4];
});


test("posValid: Is valid in a corner", () => {
  [x, y] = [9, 9];
  expect(aBoard.posValid(x, y)).toBe(true);
  [x, y] = [10, 10];
  expect(aBoard.posValid(x, y)).toBe(false);
});

test.only("posValid: try to place a ship on top of another ship", () =>{
  [x, y] = [9, 9];

  aBoard.place(x, y, shipMock, shipMock.vertical);
  expect(aBoard.posValid(x, y)).toBe(false);
})

// here i've decided to check the test.skip using the grid property to untie place() fn and atPos()
test("place: Place a ship and retrieve it", () => {
  [x, y] = [1, 1];

  expect(aBoard.place(x, y, shipMock).grid[x][y].ship).toBe(shipMock);
});

test("place: Try to place a ship out of the board", () => {
  [x, y] = [11, 11];
  expect(() => {
    aBoard.place(x, y, shipMock);
  }).toThrow(Error);

  shipMock.length = 2;
  [x, y] = [9, 9];
  expect(() => {
    aBoard.place(x, y, shipMock);
  }).toThrow(Error);
});

test("place: Placing a ship in a corner", () => {
  [x, y] = [9, 9];
  expect(aBoard.place(x, y, shipMock, shipMock.vertical).grid[x][y].ship).toBe(shipMock);
});

test("place: Check ship is in every tile", () =>{
  [x, y] = [4, 4];
  shipMock = new Ship(3);
  expect(aBoard.place(x, y, shipMock).atPos(x, y).ship).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+1, y).ship).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+2, y).ship).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+3, y)).toBe(undefined);
});


test("receiveAttack: Recieve attack on ship and on miss", () => {
  shipMock.hitIncr = jest.fn(() => {});
  shipMock.updateSunk = jest.fn(() => {});
  aBoard.place(x, y, shipMock);
  aBoard.receiveAttack(x, y);
  expect(shipMock.hitIncr).toHaveBeenCalled();
  aBoard.receiveAttack(x-1, y-1);
  expect(shipMock.hitIncr.mock.calls.length).toBe(1);
});

test("allSunk: check gameboard tracks all ships sunk", () =>{
  aBoard.place(x, y, new Ship());
  aBoard.receiveAttack(x, y);
  expect(aBoard.allSunk()).toBe(true);

  aBoard.place(x, y+1, new Ship());

  expect(aBoard.allSunk()).toBe(false);

  aBoard.receiveAttack(x, y+1);
  expect(aBoard.allSunk()).toBe(true);

})

