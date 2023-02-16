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
console.log(data);
}

//set win condition

