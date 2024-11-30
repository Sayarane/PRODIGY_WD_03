const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

let gameActive = true; // Game state
let currentPlayer = "X"; // Current player
let gameState = ["", "", "", "", "", "", "", "", ""]; 

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (gameState[cellIndex] !== "" || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer; 
  cell.classList.add("taken");

  checkResult();
  
  if (gameActive) switchPlayer();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`; // Fix template literal
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`; // Fix template literal
}

function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = "Player X's Turn";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = ""; // Clear X or O
    cell.classList.remove("taken");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", handleCellClick)
  );
  resetButton.addEventListener("click", resetGame);
});
