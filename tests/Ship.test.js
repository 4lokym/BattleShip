import {Ship} from "../src/Ship";

let aShip;

beforeEach(() =>{
  return aShip = new Ship();
})

test("Hit increases hit property", () =>{
  expect(aShip.hitIncr()).toBe(1);
});

test("isSunk", () =>{
  expect(aShip.isSunk()).toBe(false);
})

test("status: returns an array that shows where the ship was hit", () =>{
  aShip = new Ship(3);
  console.log(aShip.status)
  console.log(aShip.status[0])
  expect(aShip.status).toEqual([false, false, false]);
})

test("hitAt: specifies where to hit a ship", () =>{
  aShip = new Ship(3);
  expect(aShip.hitAt(2)).toEqual([false, false, true]);
  expect(aShip.hitAt(2)).toEqual([false, false, true]);
  expect(aShip.hitAt(1)).toEqual([false, true, true]);
  expect(aShip.hitAt(0)).toEqual([true, true, true]);
})


