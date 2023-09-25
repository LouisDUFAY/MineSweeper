import { createBoard } from "./mineSweeper.js";

const boardSize = 10;
const nbMine = 2;

const board = createBoard(boardSize,nbMine);
const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", boardSize)

board.forEach((row) => {
    row.forEach((tile) => {
        boardElement.append(tile.element)
    })
})