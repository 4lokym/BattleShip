import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { DOMGameBoard } from "./DOMGameboard";
import { Ship } from "./Ship";


export const game = function(){
  const [board1, board2] = document.querySelectorAll(".board");

  const [player1, player2] = [new Player(new Gameboard), new Player(new Gameboard)];
  const myBoard = new DOMGameBoard(player1, board1);
  const enemyBoard = new DOMGameBoard(player2, board2);

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

  setTimeout(() => {myBoard.updateBoard()}, 0)
  enemyBoard.updateBoard(true);

  enemyBoard.player.gameboard.receiveAttack(1,2);
  enemyBoard.player.gameboard.receiveAttack(1,0);

  enemyBoard.updateBoard(true);

  

  //make the board interactive
  enemyBoard.DOMContainer.addEventListener("click", (event) => {
   enemyBoard.click(event.target, enemyBoard);
  })

  

}