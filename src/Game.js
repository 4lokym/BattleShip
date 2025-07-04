import { Player } from "./Player";
import { Gameboard } from "./Gameboard";

export const game = function(){
  const boards = document.querySelectorAll(".board");

  boards.forEach((board) => {
    for(let i = 0; i< 10; i++){
      for(let j = 0; j < 10; j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `R${i}C${j}`;
        board.appendChild(cell);
      }
    }
    
  })

  boards[0].querySelector("#R3C4").classList.add("ship");
  boards[0].querySelector("#R3C4").classList.add("sunk");
  boards[0].querySelector("#R4C4").classList.add("ship");
  boards[0].querySelector("#R5C4").classList.add("ship");
}
