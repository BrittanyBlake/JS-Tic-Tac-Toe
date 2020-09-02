import { gameBoardModule } from "../main";
import { gamePlay } from "../main";

const main = require("../main");

describe("checking switch player", () => {
  test("if current player is player 1 then it should switch to player 2", () => {
    gamePlay.playerOne = "Brittany";
    gamePlay.playerTwo = "Precious";
    let currentPlayer = gamePlay.playerOne;
    gameBoardModule.boardArr[1] = "X";
    gameBoardModule.checkWinCombo();
    gamePlay.switchPlayer();
    currentPlayer = gamePlay.playerTwo;

    expect(currentPlayer).toBe(gamePlay.playerTwo);
  });

  test("if current player is player 1 then it should switch to player 2", () => {
    gamePlay.playerOne = "Brittany";
    gamePlay.playerTwo = "Precious";
    let currentPlayer = gamePlay.playerOne;
    gameBoardModule.boardArr[1] = "X";
    gameBoardModule.checkWinCombo();
    gamePlay.switchPlayer();
    currentPlayer = gamePlay.playerTwo;

    expect(currentPlayer).not.toBe(gamePlay.playerOne);
  });
});

it("resets the board array", () => {
  const addMock = jest.spyOn(main, "resetB");

  const result = addMock();
  expect(result).toStrictEqual(["", "", "", "", "", "", "", "", ""]);
});
