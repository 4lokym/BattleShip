

export class Ship{
  hit = 0;
  sunk = false;
  
  constructor(length = 1, vertical = true){
    this.length = length;
    this.status = new Array(length);
    for(let i = 0; i< length; i++){
      this.status[i] = new CellShip(this, i);
    }
    this.orizzontal = vertical;
  }

  hitIncr(){
    if(this.hit < this.length){
      this.hit++;
    }
    return this.hit;
  }

  hitAt(offset){
    if(offset >= 0 && offset < this.length){
      this.status[offset].sunk = true;
    }
    return this.status;
  }

  hitShip(offset = 0){
    this.hitIncr();
    this.hitAt(offset);
    this.updateSunk();
    return this.status[offset];
  }

  isSunk(){
    return (this.hit === this.length) ? true : false;
  }

  updateSunk(){
    this.sunk = this.isSunk();
  }
}

class CellShip{
  constructor(ship, offset = 0,sunk = false){
    this.ship = ship;
    this.sunk = sunk;
    this.offset = offset;
  }
}