import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { DOMGameBoard } from "./DOMGameboard";
import { Ship } from "./Ship";


export const game = function(){
  const boards = document.querySelectorAll(".board");

  const [player1, player2] = [new Player(new Gameboard), new Player(new Gameboard)];
  const domGamb = new DOMGameBoard(player1);
  
  domGamb.updateBoard(boards[0]);

  player1.gameboard.place(3, 5, new Ship(3,true));
  player1.gameboard.receiveAttack(3, 5);
  player1.gameboard.receiveAttack(3, 8);
  player1.gameboard.receiveAttack(4, 5);
  player1.gameboard.receiveAttack(6, 5);
  

  setTimeout(() => {domGamb.updateBoard(boards[0])}, 0)
  domGamb.updateBoard(boards[1]);


  // boards[0].querySelector("#R3C4").classList.add("ship");
  // boards[0].querySelector("#R3C4").classList.add("sunk");
  // boards[0].querySelector("#R5C4").classList.add("sunk");
  // boards[0].querySelector("#R4C4").classList.add("ship");
  // boards[0].querySelector("#R5C4").classList.add("ship");
  // boards[0].querySelector("#R5C5").classList.add("miss");
  // boards[0].querySelector("#R5C6").classList.add("miss");
}