const boardSize = 18;
const nbMine = 50;

const tileList = createBoard(boardSize,nbMine);
const tileListElement = document.querySelector(".board");
tileListElement.style.setProperty("--size", boardSize)

tileList.forEach((row) => {
    row.forEach((tile) => {
        tileListElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            revealTile(tileList, tile);
        })

        tile.element.addEventListener("contextmenu", (e)=> {
            e.preventDefault();
            markTile(tile);
        })
    })
})