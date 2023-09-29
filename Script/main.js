const boardSize = 20;
const nbMine = 70;
let currentNbFlag = nbMine;
let currentTime = 0;
let isFirstTileClicked = false
let timerInterval = undefined;

const flagCounter = document.getElementById("flagCounterContent");
flagCounter.innerText = currentNbFlag;

const timer = document.getElementById("timerContent");
timer.innerText = currentTime;

const gameStateText = document.getElementById("gameStateText");

const btnReset = document.getElementById("reset");
btnReset.addEventListener("click", () => {location.reload()})

const tileList = createBoard(boardSize,nbMine);
const tileListElement = document.querySelector(".board");
tileListElement.style.setProperty("--size", boardSize);


tileList.forEach((row) => {
    row.forEach((tile) => {
        tileListElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            revealTile(tileList, tile);
            checkGameState();
        })

        tile.element.addEventListener("contextmenu", (e)=> {
            e.preventDefault();
            markTile(tile);
        })
    })
})