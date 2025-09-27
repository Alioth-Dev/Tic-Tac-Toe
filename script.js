// GameBoard IIFE Module Using IIFE
// Makes An Array of 9 filled with empty string ''

const gameBoard = (() => {
  let board = new Array(9);
  board.fill("");

  const getBoard = () => board;

  //Makes Move (Fill Array)
  const makeMove = (index, marker) => {
    if (index >= 0 && index <= 9 && board[index] === "") {
      board[index] = marker;
    }
  };

  //Resets Board for new Game
  const resetBoard = () => {
    board.fill("");
  };

  // Check for Board Full or Not
  const isBoardFull = () => {
    return board.every((cell) => cell !== "");
  };

  return {
    getBoard,
    makeMove,
    resetBoard,
    isBoardFull,
  };
})();

const player = (name, marker) => {
  // const players =
  return {
    name,
    marker,
  };
};




const gameController = (() => {
  let players = new Array();
  let currentPlayerIndex = 0;
  let gameOver = false;
  let gameWon = false;
  let draw = false;
  
  const correctPattern = [
    // All Horizontal Patterns
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // All Vertical Patterns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // All Diagonal Pattern
    [0, 4, 8],
    [2, 4, 6],
  ];

  const startGame = (player1Name, player2Name) => {
    players = [player(player1Name, "X"), player(player2Name, "O")];

    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.resetBoard();
  };

  const playersInfo = () => players;

  const checkCombination = () => {
    for (let i = 0; i < correctPattern.length; i++) {
      let xCounter = 0;
      let oCounter = 0;
      let getOnePattern = correctPattern[i];

      for (let j = 0; j < 3; j++) {
        let indexOfPattern = Number(getOnePattern[j]);
        if (gameBoard.getBoard()[indexOfPattern] == "X") {
          xCounter++;
          if (xCounter == 3) {
            return {
              status: true,
              index: 0,
            };
          }
        } else if (gameBoard.getBoard()[indexOfPattern] == "O") {
          oCounter++;
          if (oCounter == 3) {
            return {
              status: true,
              index: 1,
            };
          }
        }
      }
    }
    return false;
  };

  const playingTurns = (indexOfBox) => {
    if (gameBoard.getBoard()[indexOfBox] == "") {
      gameBoard.makeMove(indexOfBox, players[currentPlayerIndex].marker);

      const result = checkCombination();

      if (result.status) {
       
        console.log(
          `${players[result.index].name} has Won and Its Marker is ${
            players[result.index].marker
          }`
        );

        let winMessage;
        winMessage = displayController.messageScreen()
        winMessage.textContent = `${players[result.index].name} has Won and their Marker is ${
            players[result.index].marker
          }`


        gameWon = true
        
        gameController.gameFinished()
        

        console.log(result);
        
        
      }

      currentPlayerIndex = currentPlayerIndex ? 0 : 1;
      
    } else {
      console.log("No, you Cannot Override Any Moves");
    }
  };


  const drawCheck = () => {
    if (gameBoard.isBoardFull()) {
      // console.log("Game Draw");
      let msg
      msg = displayController.messageScreen()
      msg.textContent= "Game Over"
    }
    
   return gameBoard.isBoardFull()
    
   }



  const gameFinished = () => gameWon
   
  
  

  return {
    startGame,
    playingTurns,
    playersInfo,
    drawCheck,
    gameFinished,
  };
})();






// This IIFE Module controls all Display Input and Output and Link with Game Logic
const displayController = (() => {


  const board = document.querySelectorAll(".cell")
  const playersForm = document.querySelector("#players-info");
  const message = document.querySelector(".message")


  const messageScreen = () => message


  // Gets Players Name from Form 
  playersForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let playerFirst = document.querySelector("#first-player");
    let playerSecond = document.querySelector("#second-player");

    // handle Form Closing and Reset**
    if (!(playerFirst.value == "" && playerSecond.value == "")) {
      // run and input value

      gameController.startGame(playerFirst.value, playerSecond.value)
      console.log(playerFirst.value);
      console.log(playerSecond.value);

      //Game Start Message
      message.textContent= "Game Started, Please Play your moves"

      playersForm.reset();
    }
  });


  // Update Board in Frontend
  const displayBoard = () => {
     for (let i=0; i<9; i++) {
      board[i].textContent = gameBoard.getBoard()[i]
     
      
     }
  }

  // Handled Moves from Frontend by id 0f Cells
  const handleMoves = (x) => {
    if (gameController.playersInfo().length == 2) {
      
      if (!gameController.drawCheck() && !gameController.gameFinished()) { 
   
      gameController.playingTurns(x.id)
      
      displayBoard()
      gameController.drawCheck()
      }

      else if (gameController.drawCheck()) {
        console.log("Game Over");
      }
      

      else if(gameController.gameFinished()) {
        console.log("Winner Declared");
        
      }
      
      
    }
    
  };


  return {
    handleMoves,
    displayBoard,
    messageScreen,
    
  };


})();

