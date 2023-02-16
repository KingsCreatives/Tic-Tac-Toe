const form = document.querySelector('.myForm');

const gameWinConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6]
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

//Get form data
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const modal = document.querySelector('.modal-wrapper');
    modal.style.display = "none";
    InitializeGame(data);
});


//Variables for Game
const gameVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.gameRound = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

//Eventlistner on Gameboard
const addEventListenerToGameBoard = (data) => {
    const gameBox = document.querySelectorAll('.box');
    gameBox.forEach(box => {
        box.addEventListener('click', (event) =>{
            playMove(event.target, data);
        });
    });
}


//Initialize Game
const InitializeGame = (data) => {
    let playerTurn = data.currentPlayer === "X"? data.player1Name : data.player2Name;
    adjustDom('displayTurn', `${data.player1Name}'s turn`);

    gameVariables(data);
    addEventListenerToGameBoard(data);
}


//
const  playMove = (box,data) => {

    if(data.gameOver || data.round > 8){
        return;
    }
    
    //Verify if game is over
    if(data.gameOver 
        || data.round >= 9
        || data.board[box.id] === "X" 
        || data.board[box.id] === "O"
        ) return;

     console.log(box,data);

     data.board[box.id] = data.currentPlayer;
     box.textContent = data.currentPlayer;
     box.classList.add(data.currentPlayer === "X"? "player1": "player2");
     data.round++;

     //Check end conditions
      if(endGameConditions(data)){
        return true;
      }

      //Change Player
      changePlayer(data);
}

//End Game Conditions
const endGameConditions = (data) => {
    //check if there is a winner
    if(checkWinner(data)){

        let winnerName = data.currentPlayer === "X"? data.player1Name : data.player2Name;

       adjustDom('displayTurn', `${winnerName} has Won!`);
        return true;
    } else if (data.round === 9){
        adjustDom('displayTurn', "It's a Tie" );
        data.gameOver = true;
        return true;
    } 
    return false;
}

//Check the winner of Game Round
 const  checkWinner = (data) => {
    let gameHasWinner = false;

    gameWinConditions.forEach(condition =>{
       if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]){
            gameHasWinner = true;
            data.gameOver = true;
        }
    });

    return gameHasWinner;
};

//Adjust DOM
const adjustDom = (className, textContent) =>{
    const el = document.querySelector(`.${className}`);
          el.textContent = textContent;
}

//Change Player
const changePlayer  = (data) =>{
    data.currentPlayer = data.currentPlayer === "X"? "O": "X";

    let playerTurn = data.currentPlayer === "X"? data.player1Name : data.player2Name;

    adjustDom('displayTurn', `${playerTurn}'s turn`);
}