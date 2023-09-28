const tileStatus = {
    HIDDEN : "hidden",
    REVEALED : "revealed",
    MARKED : "marked",
    MINE : "mine"
}



function createBoard(size, nbMine){
    
    const board = [];
    const minePositions = getMinePositions(size,nbMine)
    console.log(minePositions);

    for(let x = 0; x < size; x++){
        const row = []

        for(let y = 0; y < size; y++){
            const element = document.createElement("div")
            element.dataset.status = tileStatus.HIDDEN;
            
            const tile = {
                element,
                x,
                y,
                mine : isMine(minePositions, x, y),

                get status(){
                    return this.element.dataset.status
                },
                set status(value){
                    this.element.dataset.status = value;
                }
            }

            row.push(tile);

        }

        board.push(row);

    }

    console.log(board);

    return board

}

function markTile(tile){

    if(tile.status !== tileStatus.HIDDEN && tile.status !== tileStatus.MARKED){
        return
    }

    if(tile.status === tileStatus.MARKED){
        tile.status = tileStatus.HIDDEN
        udateNbFlag("add");
    }else{
        tile.status = tileStatus.MARKED
        udateNbFlag("substract");
    }
    
    checkWin();
}

function revealTile(board, tileArg){

    if(tileArg.status !== tileStatus.HIDDEN){
        return
    }
    
    if(tileArg.mine){
        tileArg.status = tileStatus.MINE;
        stopTimer();
        return
    }

    tileArg.status = tileStatus.REVEALED;
    if(isFirstTileClicked === false){
        startTimer();
        isFirstTileClicked = true;
    }

    const nearbyTile = getNearbyTile(board, tileArg)
    const nearbyMine = nearbyTile.filter(t => t?.mine)
    if(nearbyMine.length === 0){
        nearbyTile.forEach(revealTile.bind(null ,board));
    }else{
        tileArg.element.textContent = nearbyMine.length;
    }

    checkWin();
}

function getMinePositions(size, nbMine){
    const positionMine = [];

    while(positionMine.length < nbMine){
        
        const position = {
            x : randomNumber(size),
            y : randomNumber(size)
        }

        if(!positionMine.some(p => positionMatch(position, p))){
            positionMine.push(position)
        } 
    }

    return positionMine;
}

function randomNumber(size){
    return Math.floor(Math.random() * size);
}

function positionMatch(a, b){
    return a.x === b.x && a.y === b.y
}

function isMine(minePositions, x, y){
    let isMine = false;

    if(minePositions.some(p => p.x == x && p.y == y)){
        isMine = true;
    }

    return isMine
}

function getNearbyTile(board, {x, y}){
    const nearbyTile = []

    for(let xOffset = -1; xOffset <= 1 ;xOffset ++){
        for(let yOffset = -1; yOffset <= 1 ;yOffset ++){

            const tile = board[x + xOffset]?.[y + yOffset]
            if(tile){
                nearbyTile.push(tile)
            }

        }
    }
    
    return nearbyTile;
}

function udateNbFlag(operation){

    if(operation === "add"){
        currentNbFlag++;
    }else if(operation === "substract"){
        currentNbFlag--;
    }

    flagCounter.innerText = currentNbFlag;
}

function startTimer(){
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}

function updateTimer(){
    currentTime++;

    timer.innerText = currentTime;
}

function checkWin(){
    let hiddenTiles = []

    tileList.forEach(row => {
        hiddenTiles.push(row.filter(t => t.status === tileStatus.HIDDEN));
        console.log(hiddenTiles);
    })

    if(hiddenTiles.length = 0) console.log("You win !");
}