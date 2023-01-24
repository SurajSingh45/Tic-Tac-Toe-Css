var origBoard;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = document.querySelectorAll(".cell");

startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  //[0,1,2,3,4,5,6,7,8]
  //   console.log(origBoard);
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}
function turnClick(square) {
  //   console.log(square.target.id);cell id
  turn(square.target.id, huPlayer);
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  // at id 2 if '0'
  //origBoard [0,1,2,'0',3,4,...]
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  //huplayer '0' aiplayer 'X'
  // [0,1,'0','0',4,'0','X',7,8]
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      //game won
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "Green" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
}