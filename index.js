function getWinner(board) {
  const winState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winState.length; i++) {
    const [a, b, c] = winState[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if(board.filter((space) => space !== '').length === 9) return 'TIE';

  return null;
}

let numberOfPlayers = 2;
const savedGame = window.localStorage.getItem("saved-game");
let game = savedGame ? JSON.parse(savedGame) : [];
let board = savedGame ? game[game.length - 1].board : Array(9).fill("");
let lastPlayer = savedGame ? game[game.length - 1].player : "";
let currentPlayer = getNextPlayer(lastPlayer);
let winner = getWinner(board)

function newGame() {
  console.log('new game coming...')
  window.localStorage.clear();
  window.location.reload();
}

function getNextPlayer(lastPlayer) {
  if (lastPlayer === "") return "X";
  return {
    X: "O",
    O: "X",
  }[lastPlayer];
}

function play(index) {
  if(winner) return;
  currentPlayer = getNextPlayer(lastPlayer);
  if (board[index]) {
    alert("this box is played already, chose another");
    return;
  }
  board[index] = currentPlayer;
  game.push({ board: [...board], player: currentPlayer });
  window.localStorage.setItem("saved-game", JSON.stringify(game));
  window.location.reload();
}

const statsContent = `
<p>number of players ${numberOfPlayers}</p>
${winner === 'TIE' ? '<h3>Tie Game !!!</h3>' : ''}
${winner && winner !== 'TIE' ? `<h3>Player ${winner} won !!!</h3>` : ''}
${!winner ? `<h3>Next Player ${currentPlayer}</h3>` : ''}
`;

let boardContent = "";

board.forEach((played, index) => {
  boardContent += `<div class="box ${(winner === played) ? 'winner' : ''}" onclick="play(${index})">${played}</div>`;});

let noticeContent = `
${ winner ? `<button onclick="newGame()">new game</button>` : ''}
`;

function loadGame() {
  const board = document.querySelector(".board");
  const stats = document.querySelector(".stats");
  const notice = document.querySelector(".notice");
  stats.innerHTML = statsContent;
  board.innerHTML = boardContent;
  notice.innerHTML = noticeContent;

}

loadGame();
