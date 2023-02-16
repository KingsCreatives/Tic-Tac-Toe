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
    data.gameBoard = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}

//Game Board Events
const gameBoardEvents = (data) =>{
    const box = document.querySelectorAll('.box');
    box.forEach( item =>{
        item.addEventListener('click', (event) =>{
            playMove(event.target, data);
        })
    })
}

//Initialize Game
const initializeGame = (data) =>{
 const text = document.querySelector('.displayTurn');
 text.textContent = `${data.player1Name}'s turn`;
 gameVariables(data);
 gameBoardEvents(data);
}

// Play Move
const playMove = (box, data)=> {
    //Check If Game Over
    if(data.gameOver || data.round > 8) return;
    
    //Check If Box is empty
    if(data.gameBoard[box.id] === "X" || data.gameBoard[box.id] === "O") return;

    //Adjust DOM for player move, and check Win condition
    data.gameBoard[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add(data.currentPlayer === "X"? "player1": "player2");
    data.round++;
    console.log(box,data)

    //Check End Conditions
    if(endConditions(data)){
        return;
    };
};


//Game End Conditions
const endConditions = (data) =>{
  //Winner
    if(checkWinner(data)){
        let winner = data.currentPlayer === "X"? data.player1Name: data.player2Name;
        adjustDom('displayTurn', winner +  " has won! ");
        data.gameOver = true;
        return true;
    } 
    //Tie
    else if(data.round === 9){
        adjustDom('displayTurn',"It's a Tie!");
        data.gameOver = true;
        return true;
    }
    return false;
  
}


//Check Game Winner
const checkWinner = (data) =>{
    let gameHasWinner = false;

    winConditions.forEach(condition =>{
        if(data.gameBoard[condition[0]] === data.gameBoard[condition[1]] 
        && data.gameBoard[condition[1]] === data.gameBoard[condition[2]]){
            gameHasWinner = true;
            data.gameOver = true;
        }
    })

    return gameHasWinner;
};


//Adjust Dom
const adjustDom = (className, textContent) =>{
 const element = document.querySelector(`.${className}`);
 element.textContent = textContent;
};