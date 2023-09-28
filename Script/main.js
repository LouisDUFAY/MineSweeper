const boardSize = 5;
const nbMine = 5;
let currentNbFlag = nbMine;
let currentTime = 0;
let isFirstTileClicked = false
let timerInterval = undefined;

const flagCounter = document.getElementById("flagCounterContent");
flagCounter.innerText = currentNbFlag;

const timer = document.getElementById("timerContent");
timer.innerText = currentTime;

const tileList = createBoard(boardSize,nbMine);
const tileListElement = document.querySelector(".board");
tileListElement.style.setProperty("--size", boardSize);


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