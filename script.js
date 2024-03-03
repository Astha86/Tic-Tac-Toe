const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const button = document.querySelector('.btn');

let currentPlayer;
let grid;

const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initialization(){
    currentPlayer = 'X'
    gameInfo.innerText = `Player - ${currentPlayer}`;
    grid = ["", "", "", "", "", "", "", "", ""];
    button.classList.remove("active");

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';
        box.classList = `box b${index+1}`;
    });
}

initialization();

function changeTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }

    else{
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Player - ${currentPlayer}`;
}

function checkStatus(){
    let answer = "";
    winPositions.forEach(positions =>{
        if((grid[positions[0]] !== "" || grid[positions[1]] !== "" || grid[positions[2]] !== "") && ((grid[positions[0]] === grid[positions[1]]) && (grid[positions[1]] === grid[positions[2]]))){
            if(grid[positions[0]]==='X') answer = 'X';
            else answer = 'O';

            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            })

            boxes[positions[0]].classList.add('win');
            boxes[positions[1]].classList.add('win');
            boxes[positions[2]].classList.add('win');
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer} 🥳`;
        button.classList.add('active');
    }

    // count filled boxes 
    let count = 0;
    grid.forEach((box) => {
        if(box !== "") count++;
    });

    // tie
    if(count === 9){
        gameInfo.innerText = "Game Tied !!";
        button.classList.add('active');
    }
}

function handleClick(index){
    if(grid[index] === ""){
        boxes[index].innerText = currentPlayer;
        grid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        changeTurn();
        checkStatus(); 
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

button.addEventListener('click',initialization);
