import { Gameboard } from "../src/Gameboard";

beforeEach(() => {
  aBoard = new Gameboard();
  shipMock = jest.mock("../src/Ship", () => { return {horizontal: true, length: 1 }});
  [x, y] = [4, 4];
});

test("Place a ship and retrieve it", () => {
  [x, y] = [1, 1];
  expect(aBoard.place(x, y, shipMock).atPos(x, y)).toBe(shipMock);
});

test("Try to place a ship out of the board", () => {
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

test("Placing a ship in a corner", () => {
  [x, y] = [9, 9];
  expect(aBoard.place(x, y, shipMock).atPos(x, y)).toBe(shipMock);
});

test("Check ship is in every tile", () =>{
  [x, y] = [4, 4];
  shipMock.length = 3;
  expect(aBoard.place(x, y, shipMock).atPos(x, y)).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+1, y)).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+2, y)).toBe(shipMock);
  expect(aBoard.place(x, y, shipMock).atPos(x+3, y)).not.toBe(shipMock);
});

test("Recieve attack", () => {
  aBoard.place(x, y, shipMock);
  expect(aBoard.receiveAttack(x, y).sunk).toBe(true);
});
