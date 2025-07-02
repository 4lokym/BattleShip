import { SingleEntryPlugin } from "webpack";

export class Ship{
  hit = 0;
  sunk = false;
  
  constructor(length = 1, horizontal = true){
    this.length = length;
    this.orizzontal = horizontal;
  }

  hitIncr(){
    this.hit++;
    return this.hit;
  }

  isSunk(hit, length){
    return (hit === length) ? true : false;
  }

  updateSunk(){
    this.sunk = this.isSunk();
  }
}