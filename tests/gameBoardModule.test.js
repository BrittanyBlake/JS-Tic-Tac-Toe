import { gameBoardModule, checkWin } from '../main';


describe('checking winning combinations', () => {
  const player1Name = { player: 'Brittany', token: 'X', imgLink: '#' };
  const player2Name = { player: 'Precious', token: 'O', imgLink: '#' };

  it('should return the index of the winning combination with the current player', () => {
    const board = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9];
    expect(checkWin(board, player1Name)).toEqual({
      index: 0,
      player: 'X',
      currentPlayer: player1Name.player,
    });
  });

  test('it should return the index of the horizontal winning cominations where player 2 is the winner', () => {
    const board = ['O', 'X', 'X', 'O', 'O', 'O', 'X', 'O', 'X'];
    expect(checkWin(board, player2Name)).toEqual({
      index: 1,
      player: 'O',
      currentPlayer: player2Name.player,
    });
  });

  test('it should return the index of the horizontal winning combinations where player 1 is the winner', () => {
    const board = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'O', 'X'];
    expect(checkWin(board, player1Name)).toEqual({
      index: 0,
      player: 'X',
      currentPlayer: player1Name.player,
    });
  });

  test('it should return the index of the diagonal winning combinations where player 1 is the winner', () => {
    const board = ['X', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'X'];
    expect(checkWin(board, player1Name)).toEqual({
      index: 7,
      player: 'X',
      currentPlayer: player1Name.player,
    });
  });

  test('it should return the index of the diagonal winning combinations where player 2 is the winner', () => {
    const board = ['O', 'O', 'X', 'X', 'O', 'X', 'X', 'X', 'O'];
    expect(checkWin(board, player2Name)).toEqual({
      index: 6,
      player: 'O',
      currentPlayer: player2Name.player,
    });
  });

  test('it should return the index of the vertical winning combinations where player 2 is the winner', () => {
    const board = ['O', 'O', 'X', 'X', 'O', 'X', 'X', 'O', 'X'];
    expect(checkWin(board, player2Name)).toEqual({
      index: 4,
      player: 'O',
      currentPlayer: player2Name.player,
    });
  });

  test('it should return the index of the vertical winning combinations where player 1 is the winner', () => {
    const board = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'X', 'O'];
    expect(checkWin(board, player1Name)).toEqual({
      index: 3,
      player: 'X',
      currentPlayer: player1Name.player,
    });
  });

  test('it should return tie if there are no empty spaces and no winner', () => {
    const board = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'X', 'O'];
    expect(
      checkWin(board, player2Name) || checkWin(board, player2Name),
    ).toEqual('tie');
  });
});

describe('checking gameboard', () => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const newBoard = ['', 'X', '', '', '', '', '', '', ''];

  test('should return null if there are empty spaces on the board', () => {
    expect(gameBoardModule.checkWinCombo()).toBe(null);
  });

  test('should check if the there is a gameboard', () => {
    expect(gameBoardModule.boardArr).toEqual(board);
  });

  test('should check if the board re-renders after a user places their symbol', () => {
    gameBoardModule.boardArr[1] = 'X';
    expect(gameBoardModule.boardArr).toEqual(newBoard);
  });

  test('check if the board contains the users symbol', () => {
    gameBoardModule.boardArr[1] = 'X';
    expect(gameBoardModule.boardArr).toContain('X');
  });
});
