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

    //Chnage Player
    if(data.choice === 0){
        //Human vs Human Game Mode
        changePlayer(data);
    } else if(data.choice === 1){
        //Easy Ai
        easyAiMove(data);
        data.currentPlayer = "X";
    } else if(data.choice === 2){
        //Hard Ai
        impossibleAIMove(data);
        data.currentPlayer = "X";
    }
};

//Change Current player
const changePlayer = (data) =>{
    data.currentPlayer = data.currentPlayer === "X"? "O" : "X";

    let playerTurn = data.currentPlayer === "X"? data.player1Name: data.player2Name;

    adjustDom('displayTurn', `${playerTurn}'s turn`);
}


//Game End Conditions
const endConditions = (data) =>{
  //Winner
    if(checkWinner(data, data.changePlayer)){
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
const checkWinner = (data, player) =>{
    let gameHasWinner = false;

    winConditions.forEach(condition =>{
        if(data.gameBoard[condition[0]] === player && data.gameBoard[condition[1]] === player
        && data.gameBoard[condition[2]] === player){
            gameHasWinner = true;
        }
    })

    return gameHasWinner;
};


//Adjust Dom
const adjustDom = (className, textContent) =>{
 const element = document.querySelector(`.${className}`);
 element.textContent = textContent;
};

//Easy Ai Game Mode
const easyAiMove = (data) =>{
    changePlayer(data);
    data.round++;

    //Check available sopt
    let availableGameSpot = data.gameBoard.filter(
        (spot) => spot !== "X" && spot !== "O"
    );

    let move = availableGameSpot[Math.floor(Math.random() * availableGameSpot.length)];
    data.gameBoard[move] = data.player2;

    setTimeout(() =>{
    //Ai move after player 1 moves
        let box = document.getElementById(`${move}`);
        box.textContent = data.player2;
        box.classList.add('player2');
    }, 200);

    if(endConditions(data)){
        return;
    }

    changePlayer(data);
};


