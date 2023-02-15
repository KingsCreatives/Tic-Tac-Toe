const form = document.querySelector('.myForm');

//Get form data
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const modal =document.querySelector('.modal-wrapper');
    modal.style.display = "none";
    InitializeGame(data);
});


//Variables for Game
function gameVariables(data){
    data.choice = Number(data.choice);
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1Marker = "X";
    data.player2Marker = "O";
    data.gameRound = 0;
    data.currentPlayer = data.player1Marker;
    data.gameOver = false;
};

//Eventlistner on Gameboard
function addEventListenerToGameBoard(data) {
    const gameBox = document.querySelectorAll('.box');
    gameBox.forEach(box => {
        box.addEventListener('click', (event) =>{
            playMove(event.target, data);
        });
    });
}

//Initialize Game
function InitializeGame(data){
    gameVariables(data);
    addEventListenerToGameBoard(data);
    console.log(data);
}


//
function playMove(box,data){
    
    console.log(box,data);
}

