
import { gameBoardModule } from "../main";


describe("checking gameboard", () => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const newBoard = ["", "X", "", "", "", "", "", "", ""];

   test("should check for winning combos", () => {
     expect(gameBoardModule.checkWinCombo()).toBe(null);
   });

  test("check if the there is a gameboard", () => {
    expect(gameBoardModule.boardArr).toEqual(board);
  });

  test("check if the reset board is correct", () => {
    gameBoardModule.boardArr[1] = "X";
    expect(gameBoardModule.boardArr).toEqual(newBoard);
  });

  test("check if the reset board is correct", () => {
    gameBoardModule.boardArr[1] = "X";
    expect(gameBoardModule.boardArr).toContain("X");
  });
});