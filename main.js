const gameBoardModule = (() => {
  let boardArr = ['', '', '', '', '', '', '', '', ''];
  const gameBoard = document.querySelector('#board');
  const gameCells = Array.from(document.querySelectorAll('.cell'));
  let winner = null;

  const render = () => {
      boardArr.forEach((symbol, index) => {
        gameCells[index].textContent = boardArr[index]
      })

    }

    const checkWinCombo = () => {
        const winArr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        winArr.forEach((combo) => {
            if (boardArr[combo[0]] && boardArr[combo[0]] === boardArr[combo[1]] && 
                boardArr[combo[0]] === boardArr[combo[2]]) {
                winner = 'current'
            }
        })
        return winner || (boardArr.includes('') ? null : 'tie')
    }
    const resetBoard = () => {
        boardArr = ['', '', '', '', '', '', '', '', ''];
    }
    return {
        render, gameBoard, gameCells, boardArr, checkWinCombo, resetBoard
    }
}) ();

const player = (name, symbol) => {
    const playerTurn = (board, cell) => {
        const index = board.gameCells.findIndex((position) => position === cell )
        if (board.boardArr[index] === '') {
            board.render()
            return index
        }
        return null
    }
    return {name, symbol, playerTurn}
}

const gamePlay = (() => {
    const playerOneName = document.querySelector('#player1');
    const playerTwoName = document.querySelector('#player2');
    const form = document.querySelector('.player-info');
    const resetbtn = document.querySelector('#reset');
    let currentPlayer;
    let playerOne;
    let playerTwo;

    const switchPlayer = () => {
        if(currentPlayer === playerOne){
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }

    const gameRound = () => {
        const board = gameBoardModule
        const gameStatus = document.querySelector('.game-status')
        if (currentPlayer.name !== ''){
            gameStatus.textContent = `${currentPlayer.name}'s Turn`
        } else {
            gameStatus.textContent = 'Board: '
        }

        board.gameBoard.addEventListener('click', (e) => {
            const move = currentPlayer.playerTurn(board, e.target)
            if (move !== null) {
                board.boardArr[move] = `${currentPlayer.symbol}`
                if ( currentPlayer.symbol === 'X') {
                    e.target.classList.add('x')
                } else {
                    e.target.classList.add('o')
                }
                board.render()
                const winStatus = board.checkWinCombo();
                if (winStatus === 'Tie'){
                    gameStatus.textContent = "It's a Tie! You're both Losers 😝"
                } else if (winStatus === null) {
                    switchPlayer()
                    gameStatus.textContent = `${currentPlayer.name}'s Turn` 
                } else {
                    gameStatus.textContent = `Congratulations ${currentPlayer.name}! You won! 🥳🏆`
                    board.resetBoard();
                    document.querySelectorAll('.cell').forEach((e) => {
                        e.classList.remove('x')
                        e.classList.remove('o')
                    })
                    board.render();
                }
            }
        })

    }

    


}) ();