import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { DOMGameBoard } from "./DOMGameboard";
import { Ship } from "./Ship";


export const game = function(){
  const boards = document.querySelectorAll(".board");

  const [player1, player2] = [new Player(new Gameboard), new Player(new Gameboard)];
  const myBoard = new DOMGameBoard(player1);
  const enemyBoard = new DOMGameBoard(player2);

  myBoard.player.gameboard.place(1,1, new Ship(3, false), false);

  myBoard.player.gameboard.place(3,1, new Ship(2, true), true);
  myBoard.player.gameboard.place(3,7, new Ship(2, true), true);

  myBoard.player.gameboard.place(8,1, new Ship());
  myBoard.player.gameboard.place(9,8, new Ship());
  myBoard.player.gameboard.place(4,4, new Ship());

  enemyBoard.player.gameboard.place(1,1, new Ship(3, false), false);
  enemyBoard.player.gameboard.place(3,1, new Ship(2, true), true);
  enemyBoard.player.gameboard.place(3,7, new Ship(2, true), true);
  enemyBoard.player.gameboard.place(8,1, new Ship());
  enemyBoard.player.gameboard.place(9,8, new Ship());
  enemyBoard.player.gameboard.place(4,4, new Ship());



  // player1.gameboard.place(3, 5, new Ship(3,true));
  // player1.gameboard.receiveAttack(3, 5);
  // player1.gameboard.receiveAttack(3, 8);
  // player1.gameboard.receiveAttack(4, 5);
  // player1.gameboard.receiveAttack(6, 5);
  // player1.gameboard.receiveAttack(3, 2);
  

  setTimeout(() => {myBoard.updateBoard(boards[0])}, 0)
  enemyBoard.updateBoard(boards[1], true);

  enemyBoard.player.gameboard.receiveAttack(1,2);
  enemyBoard.player.gameboard.receiveAttack(1,0);

  enemyBoard.updateBoard(boards[1], true);

}