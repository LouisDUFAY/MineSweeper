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
    }else{
        tile.status = tileStatus.MARKED
    }
    

}

function revealTile(tile){

    
    if(tile.status === tileStatus.MARKED || tile.status === tileStatus.REVEALED){
        return
    }
    
    if(tile.mine){
        tile.status = tileStatus.MINE;
        return
    }

    tile.status = tileStatus.REVEALED;
    const nearbyTile = getNearbyTile(board, tile)
    const nearbyMine = nearbyTile.filter(t => t?.mine)
    if(nearbyMine.length === 0){
        nearbyTile.forEach();
    }else{
        tile.element.innerText = nearbyMine.length;
    }
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

function getNearbyTile(board, tile){
    const nearbyTile = []

    for(let x = tile.x-1; x <= tile.x+1 ;x++){
        for(let y = tile.y-1; y <= tile.y+1 ;y++){

            nearbyTile.push(board[x]?.[y])

        }
    }
    // console.log(nearbyTile);
    return nearbyTile;
}

