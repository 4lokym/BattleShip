

export class Ship{
  hit = 0;
  sunk = false;
  
  constructor(length = 1, horizontal = true){
    this.length = length;
    this.status = new Array(length);
    for(let i = 0; i< length; i++){
      this.status[i] = false;
    }
    this.orizzontal = horizontal;
  }

  hitIncr(){
    if(this.hit < this.length){
      this.hit++;
    }
    return this.hit;
  }

  hitAt(offset){
    if(offset >= 0 && offset < this.length){
      this.status[offset] = true;
    }
    return this.status;
  }

  hitShip(offset = 0){
    this.hitIncr();
    this.hitAt(offset);
    this.updateSunk();
    return this.sunk;
  }

  isSunk(){
    return (this.hit === this.length) ? true : false;
  }

  updateSunk(){
    this.sunk = this.isSunk();
  }
}