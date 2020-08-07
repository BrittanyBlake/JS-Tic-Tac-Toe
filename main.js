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