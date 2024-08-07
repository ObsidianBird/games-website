
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//board
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

//candies
var currTile;
var otherTile;

window.onload = function () {
    startGame();
    window.setInterval(function(){ //time intervallum
        crushCandy();
    },100);
}

function randomCandy (){
    return candies[Math.floor(Math.random()*candies.length)]; //0 - 5.99
}

function startGame(){
    for(let r =  0; r < rows; r++){ /* r=rows */
        let row = [];
        for (let c = 0; c < columns; c++){ /* c=columns */
            // create <img id="0-0"> --> <img id="0-1" src="./images/Red.png"> etc. helyett van ez
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //drag function
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver); //click on a candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy (touching)
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("drop", dragDrop); //drop a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag completed, we swap candies


            document.getElementById("board").append(tile);
            row.push(tile);
        } 
        board.push(row);

    }
    console.log(board);
}

function dragStart(){
    currTile = this; //that tile was clicked to drag (save to a currTile variable)
}

function dragOver(e) {
    e.preventDefault();

}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(e){

}


function dragDrop(){
    otherTile = this; // the target tile 
}

function dragEnd(){  //do the dropping

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")){ /*if one of them was a blank tile*/ 
        return;
    }
    //only let swap candies next to each other
    let currCoords = currTile.id.split("-"); //id="0-0" --> ["0" , "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //directions made clear
    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    // move to a direction
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent){
    //swap curr with other
        let currImg = currTile.src;
        let  otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove){
            let currImg = currTile.src;
            let  otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy (){
    //crushFive(); do later
    //crushFour(); do later
    crushThree();
}

function crushThree(){
   //check rows
   for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
            candy1.src = "./images/blank.png";
            candy2.src = "./images/blank.png";
            candy3.src = "./images/blank.png";
            score += 30;
        }
    }
}

//check columns
for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows-2; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
            candy1.src = "./images/blank.png";
            candy2.src = "./images/blank.png";
            candy3.src = "./images/blank.png";
            score += 30;
        }
    }
}
}

function checkValid() {
       //check rows
   for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
            return true;
        }
    }
}

//check columns
for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows-2; r++) {
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
            return true;
        }
    }
}

return false; //if didn't find any combination
}