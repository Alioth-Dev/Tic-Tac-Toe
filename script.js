// GameBoard IIFE Module Using IIFE
// Makes An Array of 9 filled with empty string ''

const gameBoard = ( () => {
    let board = new Array(9)
    board.fill('')

    const getBoard = () => board

    //Makes Move (Fill Array)
    const makeMove = (index, marker) => {
        if(index >= 0 && index <= 9 && board[index]==='') {
            board[index] = marker
        }
    }

    //Resets Board for new Game
    const resetBoard = () => {
         board.fill('')
    }

    // Check for Board Full or Not
    const isBoardFull = () => {
        return board.forEach((cell) => cell !== '')
    }

    return {
        getBoard,
        makeMove,
        resetBoard,
        isBoardFull,
    }
    
})();




const player = (name, marker) => {

    // const players = 
    return {
        name,
        marker,
    }
}





const gameController = ( () => {
    let players
    let currentPlayerIndex = 0
    let gameOver = false
    const correctPattern = [
        // All Horizontal Patterns
        [0,1,2], [3,4,5], [6,7,8],
        // All Vertical Patterns
        [0,3,6], [1,4,7], [2,5,8],
        // All Diagonal Pattern
        [0,4,8], [2,4,6]
    ]


    const startGame = (player1Name, player2Name) => {
        players = [
            player(player1Name, 'X'),
            player(player2Name, 'O'),
        ]


        currentPlayerIndex = 0
        gameOver = false
        gameBoard.resetBoard()
    }

    const playersInfo = () => players


    const checkCombination = () => {
        for(let i = 0; i<correctPattern.length; i++) {
            let xCounter = 0;
            let oCounter = 0;
            let getOnePattern = correctPattern[i]

            for(let j = 0; j<3; j++) {
                let indexOfPattern = Number(getOnePattern[j])
                if(gameBoard.getBoard()[indexOfPattern] == "X") {
                    xCounter++
                    if(xCounter == 3) {
                        return {
                            status: true,
                            index: 0
                        }
                    }
                }
                else if(gameBoard.getBoard()[indexOfPattern] == "X") {
                    oCounter++
                    if(oCounter == 3) {
                        return {
                            status: true,
                            index: 1
                        }
                    }
                }

            }
        }
        return false
    }


    const playingTurns = (indexOfBox) => {
        if(gameBoard.getBoard()[indexOfBox] == '') {
            gameBoard.makeMove(indexOfBox, players[currentPlayerIndex].marker)
           

            const result = checkCombination()

            if(result.status && result) {
                console.log(`${players[result.index].name} has Won and Its Marker is ${players[result.index].marker}`);
                
            }

            currentPlayerIndex = currentPlayerIndex ? 0 : 1
            console.log(currentPlayerIndex)
            
        
        }
        

        else {

            console.log("No, you Cannot Override Any Moves");
            
        }
        
    }


    return {
        startGame,
        playingTurns,
        playersInfo,
    }
    
})()


//Emptyy Board
console.log(gameBoard.getBoard())

// Playing Game Via Console
gameController.startGame("UTKARSH", "SIDDI")

console.log(gameController.playersInfo())


// Filling Index 1 and box with X
// gameBoard.getBoard()[1] = "X"


gameController.playingTurns('0')
gameController.playingTurns('0')
gameController.playingTurns('5')
gameController.playingTurns('1')
gameController.playingTurns('7')
gameController.playingTurns('2')









console.log(gameBoard.getBoard())
const displayController = ( () => {
    
})()