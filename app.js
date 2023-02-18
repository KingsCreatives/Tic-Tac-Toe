//Win conditions
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//Event Listener to get user data
const form = document.querySelector('.myForm');

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const modal = document.querySelector('.modal-wrapper');
    modal.style.display = "none";
    initializeGame(data);
});


//Game Variables
const gameVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}

//Game Board Events
const addEventListenerToGameBoard = (data) =>{
    const box = document.querySelectorAll('.box');
    box.forEach( item =>{
        item.addEventListener('click', (event) =>{
            playMove(event.target, data);
        })
    })
}

//Initialize Game
const initializeGame = (data) =>{
 adjustDom('displayTurn', `${data.player1Name}'s turn`);
 gameVariables(data);
 addEventListenerToGameBoard(data);
}

//Play Moves
const playMove = (box, data) => {
  if(data.gameOver || data.round > 8){
    return;
  }

  if(data.board[box.id] === "X" || data.board[box.id] === "O"){
    return;
  }

  data.board[box.id] = data.currentPlayer;
  box.textContent = data.currentPlayer;
  box.classList.add(data.currentPlayer === "X"? "player1": "player2");
  data.round++;


  if(endConditions(data)){
    return;
  }

  //Change player
  changePlayer(data);
}

//Change Current Player
const changePlayer = (data) =>{
    data.currentPlayer = data.currentPlayer === "X"? "O" : "X";
    let displayTurnText = data.currentPlayer === "X"? data.player1Name : data.player2Name;
    adjustDom('displayTurn', `${displayTurnText}'s turn`);
}


const endConditions = (data) => {
    if(checkWinner(data)){
        let winnerName = data.currentPlayer === "X"? data.player1Name : data.player2Name;
        adjustDom('displayTurn', winnerName + " has won! ");
        return true;
    } else if(data.round === 9){
        adjustDom('displayTurn',"It's a Tie!");
        data.gameOver = true;
        return true;
    }
    return false;
};

//Adjust Dom
const adjustDom = (className, textContent) => {
    const el = document.querySelector(`.${className}`);
    el.textContent = textContent;
}


const checkWinner = (data) => {
   let result = false;

   winConditions.forEach((condition) => {
     if(data.board[condition[0]] === data.board[condition[1]] &&
        data.board[condition[1]] === data.board[condition[2]]){
            data.gameOver = true;
            result = true;

        }
   });

   return result;
}