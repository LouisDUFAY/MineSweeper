import { createBoard } from "./mineSweeper.js";

const board = createBoard(2,2);
const boardElement = document.querySelector(".board");

board.forEach((row) => {
    row.forEach((tile) => {
        boardElement.append(tile.element)
    })
})