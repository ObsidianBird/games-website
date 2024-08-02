var character = document.getElementById("character");
var block = document.getElementById("block");
function jump() {
  if (!character.classList.contains("animate")) {
    /*for using more than once*/
    character.classList.add("animate");
  }

  setTimeout(function () { /*for no spam*/
    character.classList.remove("animate");
  }, 500);
}

/*----------------------------------------hit----------------------------------------*/
var checkDead = setInterval(function () {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); /*top of the char*/
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left")); /*left of the block*/

  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) { //hit
    block.style.animation = "none";
    block.style.display = "none";
    alert("Try again!"); 
    resetGame(); //reset after alert button
  }
}, 10);

function resetGame() { //after reset the game
  character.style.top = "130px";
  block.style.top = "75px";
  block.style.animation = "block 1s infinite";
  block.style.display = "block";
  
}
