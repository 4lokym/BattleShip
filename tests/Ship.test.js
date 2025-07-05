import { Ship } from "../src/Ship";

let aShip;

beforeEach(() => {
  aShip = new Ship();
});

test("Hit increases hit property", () => {
  expect(aShip.hitIncr()).toBe(1);
});

test("isSunk", () => {
  expect(aShip.isSunk()).toBe(false);
});

test("status: returns an array that shows where the ship was hit", () => {
  aShip = new Ship(3);
  expect(aShip.status[0].sunk).toEqual(false);
  expect(aShip.status[1].sunk).toEqual(false);
  expect(aShip.status[2].sunk).toEqual(false);
  expect(aShip.status[0].ship).toEqual(aShip);
});

test("hitAt: specifies where to hit a ship", () => {
  aShip = new Ship(3);

  expect(aShip.hitAt(2)[2].sunk).toEqual(true);
  expect(aShip.status[0].sunk).toEqual(false);
  expect(aShip.status[1].sunk).toEqual(false);

  expect(aShip.hitAt(2)[2].sunk).toEqual(true);
  expect(aShip.status[0].sunk).toEqual(false);
   expect(aShip.status[1].sunk).toEqual(false);

  expect(aShip.hitAt(1)[1].sunk).toEqual(true);
  expect(aShip.status[0].sunk).toEqual(false);
   expect(aShip.status[2].sunk).toEqual(true);

  expect(aShip.hitAt(0)[0].sunk).toEqual(true);
})

test("hitShip: a composition function", () => {
  aShip = new Ship();
  expect(aShip.hitShip().sunk).toBe(true);
});
