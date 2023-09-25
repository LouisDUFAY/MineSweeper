const tileStatus = {
    HIDDEN : "hidden",
    REVEALED : "revealed",
    MARKED : "marked",
    MINE : "mine"
}



export function createBoard(size, nbMine){
    

    const board = [];
    for(let x = 0; x < size; x++){
        const row = []

        for(let y = 0; y < size; y++){
            const element = document.createElement("div")
            element.dataset.status = tileStatus.HIDDEN;
            const tile = {
                element,
                x,
                y,
            }

            row.push(tile);

        }

        board.push(row);

    }

    console.log(board);

    return board

}