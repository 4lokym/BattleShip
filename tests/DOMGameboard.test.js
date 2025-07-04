import { DOMGameBoard } from "../src/Game";
import { Gameboard } from "../src/Gameboard";

const boardMock = jest.mock("../src/Gameboard", () => {new Gameboard()});


//fromCellToDOM should return a dom element with correct classes and attributes
test("fromCellToDOM: cell is empty", () => {
  expect(fromCellToDOM({}).classList.contains("cell")).toEqual(true);
})

test("fromCellToDOM: cell has a ship",() => {
  expect(fromCellToDOM({horizontal: true, length: 1, sunk: false}).classList.contains("ship")).toEqual(true);
})

test("fromCellToDOM: cell has a sunk ship",() => {
  expect(fromCellToDOM({horizontal: true, length: 1, sunk: false}).classList.contains("sunk")).toEqual(true);
})
test("fromCellToDOM: cell is miss",() => {
  expect(fromCellToDOM({miss: true}).classList.contains("miss")).toEqual(true);
})

test("buildBoard: get domElement list with all cells", () => {
  //buildBoard should return an array of DOM elements rappresenting the cells
  const arr = buildBoard(boardMock);

  //if implementation changes and test breaks, delete this {
  boardMock.place(0, 0, {horizontal: true, length: 1, sunk: false})
  expect(arr[0].classList.contains("ship")).toBe(true);
  //}

  expect(arr.length).toBe(100);

  // if implementation changes and test breaks, delete the tests below
  expect(arr[0].id).toBe("R0C0");
  expect(arr[15].id).toBe("R1C5");
});