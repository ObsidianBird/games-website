//board
var blockSize = 25; //1 block size
var rows = 20; 
var cols = 20;
var board; 
var context; 

//snake head

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0; 
var velocityY = 0;

//snake body growing from nutritions

 var snakeBody = []; //array, xy coordinates

//food

var foodX;
var foodY;

var gameOver = false;



window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update(); multiple times
    setInterval(update,  1000/10); //100ms update
}
//block colors painting
function update(){
    //game over
    if (gameOver){
        return;
    }
    //board
    context.fillStyle="#13004d"; //dark blue
    context.fillRect(0, 0, board.width, board.height); 

    //food
    context.fillStyle="#cc0000"; //red
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){ 
        snakeBody.push([foodX, foodY]) 
        placeFood(); //place new food
    }
    
  // actual growing because of the food and moving from the last part
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody [i-1];
    }
    if (snakeBody.length){
        snakeBody[0] =[snakeX, snakeY]; //if body parts before, send it to the head
    } 

    //snake head
    context.fillStyle="#80ff80"; //green
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //snake body growing
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
        //game over conditions
            //1. out from the canvas
            if (snakeX < 0 || snakeX > blockSize*cols || snakeY < 0 || snakeY > blockSize*rows){
                gameOver = true;
                alert("Game Over! Not the time for thinking outside of the box...");
    }
            //2. self eating
            for (let i =0; i < snakeBody.length; i++){
                if (snakeX == snakeBody[i][0]&&snakeY == snakeBody[i][1]){
                    gameOver = true;
                    alert("Game Over! Go and eat something else and don't be a cannibal!")
                }
    }


}


//snake head change direction
function changeDirection (e){
    if (e.code ==  "ArrowUp" && velocityY != 1){
            velocityX = 0;
            velocityY = -1;
    }

    else if (e.code ==  "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code ==  "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code ==  "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


//food placing
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
