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
    data.playerOneMarker = "X";
    data.playerTwoMarker = "O";
    data.gameRound = 0;
    data.gameOver = false;
};

//Initialize Game
function InitializeGame(data){
    gameVariables(data);
    console.log(data);
}
