import { DOMGameBoard } from "../src/Game";
import { Gameboard } from "../src/Gameboard";

const boardMock = jest.mock("../src/Gameboard", () => {new Gameboard()});

const elem = document.createElement("div");
elem.classList.add("cell");

//fromCellToDOM should return a dom element with correct classes and attributes
test("fromCellToDOM: cell is empty", () => {
  expect(fromCellToDOM()).toEqual(elem);
})

test("fromCellToDOM: cell has a ship",() => {
  elem.classList.add("ship");
  expect(fromCellToDOM({horizontal: true, length: 1, sunk: false})).toEqual(elem);
})

test("fromCellToDOM: cell has a sunk ship",() => {
  elem.classList.add("sunk");
  expect(fromCellToDOM({horizontal: true, length: 1, sunk: false})).toEqual(elem);
})
test("fromCellToDOM: cell is miss",() => {
  elem = document.createElement("div");
  elem.classList.add("miss")
  expect(fromCellToDOM({miss: true})).toEqual(elem);
})

test("buildBoard: get domElement list with all cells", () => {
  //buildBoard should return an array of DOM elements rappresenting the cells
  const arr = buildBoard(boardMock);

  //if implementation changes and test breaks, delete this {
  boardMock.place(0, 0, {horizontal: true, length: 1, sunk: false})
  expect(arr[0].classList.contains("ship"));
  //}

  expect(arr.length).toBe(100);

  // if implementation changes and test breaks, delete the tests below
  expect(arr[0].id).toBe("R0C0");
  expect(arr[15].id).toBe("R1C5");
});