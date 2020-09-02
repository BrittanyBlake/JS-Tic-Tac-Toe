const gameBoardModule = (() => {
  let boardArr = ["", "", "", "", "", "", "", "", ""];
  const gameBoard = document.querySelector("#board");
  const gameCells = Array.from(document.querySelectorAll(".cell"));
  let winner = null;

  const render = () => {
    boardArr.forEach((symbol, index) => {
      gameCells[index].textContent = boardArr[index];
    });
  };

  const checkWinCombo = () => {
    const winArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winArr.forEach((combo) => {
      if (
        boardArr[combo[0]] &&
        boardArr[combo[0]] === boardArr[combo[1]] &&
        boardArr[combo[0]] === boardArr[combo[2]]
      ) {
        winner = "current";
      }
    });
    return winner || (boardArr.includes("") ? null : "Tie");
  };
  const resetBoard = () => {
    boardArr = ["", "", "", "", "", "", "", "", ""];
  };
  return {
    render,
    gameBoard,
    gameCells,
    boardArr,
    checkWinCombo,
    resetBoard,
  };
})();

const player = (name, symbol) => {
  const playerTurn = (board, cell) => {
    const index = board.gameCells.findIndex((position) => position === cell);
    if (board.boardArr[index] === "") {
      board.render();
      return index;
    }
    return null;
  };
  return { name, symbol, playerTurn };
};
const reset = () => {
  const resetTheBoard = gameBoardModule.resetBoard();
  return resetTheBoard;
};


  const playerInfo = (player, token, imgLink) => ({ player, token, imgLink });
  const player1Name = playerInfo(
    "",
    "X",
    "https://img.icons8.com/ios-filled/160/000000/x.png"
  );
  const player2Name = playerInfo(
    "player",
    "O",
    "https://img.icons8.com/ios-filled/100/000000/o.png"
  );
  let origBoard = [""];
  const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  const checkWin = (board, currentPlayer) => {
    const player = currentPlayer.token;
    const turnPlayed = board.reduce(
      (acc, token, idx) =>
        token === currentPlayer.token ? acc.concat(idx) : acc,
      []
    );
    let gameWon = "tie";
    /* eslint-disable */
     for (const [index, win] of winningCombs.entries()) {
      /* eslint-enable */ 
      if (
        win.every((elem) => turnPlayed.indexOf(elem) !== -1)
      ) {
        gameWon = { index, player, currentPlayer: currentPlayer.player };
      }
    }
    return gameWon;
  };


const gamePlay = (() => {
  const playerOneName = document.querySelector("#player1");
  const playerTwoName = document.querySelector("#player2");
  const form = document.querySelector(".player-info");
  const resetbtn = document.querySelector("#reset");
  let currentPlayer;
  let playerOne;
  let playerTwo;

  const switchPlayer = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  };

  const gameRound = () => {
    const board = gameBoardModule;
    const gameStatus = document.querySelector(".game-status");
    if (currentPlayer.name !== "") {
      gameStatus.textContent = `${currentPlayer.name}'s Turn`;
    } else {
      gameStatus.textContent = "Board: ";
    }

    board.gameBoard.addEventListener("click", (e) => {
      const move = currentPlayer.playerTurn(board, e.target);
      if (move !== null) {
        board.boardArr[move] = `${currentPlayer.symbol}`;
        if (currentPlayer.symbol === "X") {
          e.target.classList.add("x");
        } else {
          e.target.classList.add("o");
        }
        board.render();
        const winStatus = board.checkWinCombo();
        if (winStatus === "Tie") {
          gameStatus.textContent = "It's a Tie! You're both Losers 😝";
        } else if (winStatus === null) {
          switchPlayer();
          gameStatus.textContent = `${currentPlayer.name}'s Turn`;
        } else {
          gameStatus.textContent = `Congratulations ${currentPlayer.name}! You won! 🥳🏆`;
          setTimeout(() => {
            board.resetBoard();
            document.querySelectorAll(".cell").forEach((e) => {
              e.classList.remove("x");
              e.classList.remove("o");
            });
            board.render();
          }, 3000);
        }
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (playerOneName.value !== "" && playerTwoName.value !== "") {
        playerOne = player(playerOneName.value, "X");
        playerTwo = player(playerTwoName.value, "O");
        currentPlayer = playerOne;
        gameRound();
        form.classList.add("d-none");
        document.querySelector(".place").classList.remove("d-none");
      } else {
        window.location.reload();
      }
    });

    resetbtn.addEventListener("click", () => {
      document.querySelector(".game-status").textContent = "Board: ";
      document.querySelector("#player1").value = "";
      document.querySelector("#player2").value = "";
      window.location.reload();
    });
  });
  return { switchPlayer, gameRound, reset };
})();

const Emptyboard = ["", "", "", "", "", "", "", "", ""];

module.exports = {
  checkWin,
  winningCombs,
  gamePlay,
  gameBoardModule,
  resetB: () => Emptyboard,
};
