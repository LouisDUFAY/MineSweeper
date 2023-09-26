const boardSize = 10;
const nbMine = 5;

const board = createBoard(boardSize,nbMine);
const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", boardSize)

board.forEach((row) => {
    row.forEach((tile) => {
        boardElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            revealTile(tile);
        })

        tile.element.addEventListener("contextmenu", (e)=> {
            e.preventDefault();
            markTile(tile);
        })
    })
})