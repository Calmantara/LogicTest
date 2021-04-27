const { solution } = require("./app1");

describe("Check integration testing", () => {
  test("should specify array to integration 1", () => {
    let records = [];
    expect(
      solution([
        "Enter uid1234 Muzi",
        "Enter uid4567 Prodo",
        "Leave uid1234",
        "Enter uid1234 Prodo",
        "Change uid4567 Ryan",
      ])
    ).toEqual([
      "Prodo came in.",
      "Ryan came in.",
      "Prodo has left.",
      "Prodo came in.",
    ]);
  });
  test("should specify array to integration 2", () => {
    let records = [];
    expect(
      solution([
        "Enter uid1234 Muzi",
        "Enter uid4567 Prodo",
        "Enter uid4567 Prodo",
        "Leave uid1234",
        "Enter uid1234 Prodo",
        "Change uid4567 Ryan",
      ])
    ).toEqual([
      "Prodo came in.",
      "Ryan came in.",
      "Prodo has left.",
      "Prodo came in.",
    ]);
  });
  test("should specify array to integration 3", () => {
    let records = [];
    expect(
      solution(["Leave uid4567", "Enter uid4567 Prodo", "Change uid4567 Ryan"])
    ).toEqual(["Ryan came in."]);
  });
  test("should specify array to integration 3", () => {
    let records = [];
    expect(
      solution([
        "Leave uid4567",
        "Enter uid4567 Prodo",
        "Leave uid4567",
        "Change uid4567 Ryan",
      ])
    ).toEqual(["Ryan came in.", "Ryan has left."]);
  });
  test("should specify array to integration 3", () => {
    let records = [];
    expect(
      solution([
        "Leave uid4567",
        "Enter uid4567 Prodo",
        "Change uid4567 Ryan",
        "Leave uid4567",
        "Leave uid4567",
      ])
    ).toEqual(["Ryan came in.", "Ryan has left."]);
  });
});
