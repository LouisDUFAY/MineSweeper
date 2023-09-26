const tileStatus = {
    HIDDEN : "hidden",
    REVEALED : "revealed",
    MARKED : "marked",
    MINE : "mine"
}



export function createBoard(size, nbMine){
    
    //générer "nbMine" de position aléatoire (boucle while)
    //ajouter ces positions à un tableau
    //comparé la postion de la cellule générer avec la liste de position des mines
    //si oui --> mine = true
    const board = [];
    const minePositions = getMinePositions(size,nbMine)
    console.log(minePositions);

    for(let x = 0; x < size; x++){
        const row = []

        for(let y = 0; y < size; y++){
            const element = document.createElement("div")
            element.dataset.status = tileStatus.HIDDEN;
            element.dataset.isMine = "0"
            
            
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

            if(tile.mine){
                tile.element.dataset.isMine = "1";
            }

            row.push(tile);

        }

        board.push(row);

    }

    console.log(board);

    return board

}

export function markTile(tile){

    if(tile.status !== tileStatus.HIDDEN && tile.status !== tileStatus.MARKED){
        return
    }

    if(tile.status === tileStatus.MARKED){
        tile.status = tileStatus.HIDDEN
    }else{
        tile.status = tileStatus.MARKED
    }
    

}

export function revealTile(tile){
    if(tile.status === tileStatus.MARKED || tile.status === tileStatus.REVEALED){
        return
    }
    
    if(tile.element.dataset.isMine === "1"){
        tile.status = tileStatus.MINE;
        return
    }

    tile.status = tileStatus.REVEALED;
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

