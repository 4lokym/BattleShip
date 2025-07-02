import {Ship} from "../src/Ship";

let aShip;

beforeEach(() =>{
  return aShip = new Ship();
})

test("Hit increases hit property", () =>{
  expect(aShip.hitIncr()).toBe(1);
});

test("isSunk", () =>{
  expect(aShip.isSunk(0, 1)).toBe(false);
})


