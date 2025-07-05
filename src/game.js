import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { DOMGameBoard } from "./DOMGameboard";
import { Ship } from "./Ship";

export const game = function () {
  // init the board
  const [board1, board2] = document.querySelectorAll(".board");

  const [player1, player2] = [
    new Player(new Gameboard()),
    new Player(new Gameboard()),
  ];
  const myBoard = new DOMGameBoard(player1, board1);
  const enemyBoard = new DOMGameBoard(player2, board2);

  myBoard.player.gameboard.place(1, 1, new Ship(3, false), false);

  myBoard.player.gameboard.place(3, 1, new Ship(2, true), true);
  myBoard.player.gameboard.place(3, 7, new Ship(2, true), true);

  myBoard.player.gameboard.place(8, 1, new Ship());
  myBoard.player.gameboard.place(9, 8, new Ship());
  myBoard.player.gameboard.place(4, 4, new Ship());

  enemyBoard.player.gameboard.place(1, 1, new Ship(3, false), false);
  enemyBoard.player.gameboard.place(3, 1, new Ship(2, true), true);
  enemyBoard.player.gameboard.place(3, 7, new Ship(2, true), true);
  enemyBoard.player.gameboard.place(8, 1, new Ship());
  enemyBoard.player.gameboard.place(9, 8, new Ship());
  enemyBoard.player.gameboard.place(4, 4, new Ship());

  enemyBoard.updateWhiteBoard();
  myBoard.updateBoard();

  const game1 = new Game(myBoard, enemyBoard);
  game1.init();

};



export class Game{
  constructor(DOMGameBoard1, DOMGameBoard2){
    this.DOMGameBoard1 = DOMGameBoard1;
    this.DOMGameBoard2 = DOMGameBoard2;
    this.switch1 = new mySwitch(true, DOMGameBoard1);
    this.switch2 = new mySwitch(false, DOMGameBoard2, this.switch1);
    this.switch1.setOther(this.switch2);
  }

  init(){
    this.connectEvent(this.DOMGameBoard1, this.switch2);
    this.connectEvent(this.DOMGameBoard2, this.switch1);

  }

  connectEvent(board, switch_) {
    board.DOMContainer.addEventListener("click", (event) => {
      if(event.target.classList.contains("cell") && board.clickable(event.target)){
        this.actions(event.target, switch_);
      }
    });
  }

  actions(cell, switch_){
    const board = switch_.other.data;
    if (switch_.active) {
      switch_.setOff();
      board.click(cell);
      this.transitScreen(switch_)
    }
  }

  transitScreen(switch_) {
    this.DOMGameBoard1.updateBoard(true);
    this.DOMGameBoard2.updateBoard(true);
    this.DOMGameBoard1.DOMContainer.classList.add("hide-board");
    this.DOMGameBoard2.DOMContainer.classList.add("hide-board");
    setTimeout(() => {this.nextTurn(switch_)}, 1000);
  }

  nextTurn(switch_){
    switch_.flip()
    this.DOMGameBoard1.DOMContainer.classList.remove("hide-board");
    this.DOMGameBoard2.DOMContainer.classList.remove("hide-board");
    switch_.data.updateBoard(true);
    switch_.other.data.updateBoard();
  }
}

class mySwitch{
  constructor(active = true, data = null, other = null){
    if(other && !(other instanceof mySwitch)){
      throw new Error("argument is not a switch");
    }
    this.active = active;
    this.other = other;
    this.last = active;
    this.data = data;
  }

  flip(){

    if(this.active === false && this.other.active === false){
      this.active = !this.last;
      this.other.active = !this.active;
    }else{
      this.last = this.active;
      this.active = !this.active;
      this.other.active = !this.other.active;
    }
  }

  setOff(){
    this.last = this.active;
    this.active = false;
    this.other.active = false;
  }

  setOther(other){
    if(!(other instanceof mySwitch)){
      throw new Error("argument is not a switch");
    }
    this.other = other;
  }

}