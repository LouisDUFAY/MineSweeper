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
            
            const tile = {
                element,
                x,
                y,
                get status(){
                    return this.element.dataset.status
                },
                set status(value){
                    console.log("set")
                    this.element.dataset.status = value;
                }
            }

            row.push(tile);

        }

        board.push(row);

    }

    //console.log(board);

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
    return Math.floor(Math.random() * size-1); 
}

function positionMatch(a, b){
    return a.x === b.x && a.y === b.y
}