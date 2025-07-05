import "./style.css";
import { game } from "./game"
import  { player } from "./Player"
import { Gameboard } from "./Gameboard";
import { GameWindow } from "./GameWindow";

game();

new GameWindow([1,2,3,4,5]);
