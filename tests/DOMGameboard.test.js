/**
 * @jest-environment jsdom
 */

import { DOMGameBoard } from "../src/Game";
import { Gameboard } from "../src/Gameboard";

const boardMock = new Gameboard();
let DOMboard = new DOMGameBoard(1, 2);

//fromCellToDOM should return a dom element with correct classes and attributes
test("fromCellToDOM: cell is empty", () => {
  expect(DOMboard.fromCellToDOM({}).classList.contains("cell")).toEqual(true);
});

test("fromCellToDOM: cell has a ship", () => {
  expect(
    DOMboard.fromCellToDOM({
      horizontal: true,
      length: 1,
      sunk: false,
    }).classList.contains("ship"),
  ).toBe(true);
});

test("fromCellToDOM: cell has a sunk ship", () => {
  expect(
    DOMboard.fromCellToDOM({
      horizontal: true,
      length: 1,
      sunk: true,
    }).classList.contains("sunk"),
  ).toBe(true);
});
test("fromCellToDOM: cell is miss", () => {
  expect(
    DOMboard.fromCellToDOM({ miss: true }).classList.contains("miss"),
  ).toBe(true);
});

test("buildBoard: get domElement list with all cells", () => {
  //buildBoard should return an array of DOM elements rappresenting the cells

  
  boardMock.place(0, 0, { horizontal: true, length: 1, sunk: false });
  const arr = DOMboard.buildBoard(boardMock.grid);
  expect(arr[0].classList.contains("ship")).toBe(true);

  expect(arr.length).toBe(100);

  // if implementation changes and test breaks, delete the tests below
  expect(arr[0].id).toBe("R0C0");
  expect(arr[15].id).toBe("R1C5");
});
