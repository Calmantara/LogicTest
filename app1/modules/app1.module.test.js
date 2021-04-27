const {
  ChangeHandler,
  EnterHandler,
  LeaveHandler,
  CheckWordLength,
  CheckWordValid,
  ParseData,
} = require("./app1.module");

describe("Parse data test", () => {
  test("should specify json data as parsed data 1", () => {
    expect(ParseData({ words: "Enter uid1234 Muzi" })).toEqual({
      status: "Enter",
      uuid: "uid1234",
      username: "Muzi",
    });
  });
  test("should specify json data as parsed data 2", () => {
    expect(ParseData({ words: "Leave uid1234" })).toEqual({
      status: "Leave",
      uuid: "uid1234",
      username: "",
    });
  });
  test("should specify json data as parsed data 3", () => {
    expect(ParseData({ words: "Change uid1234 Calman" })).toEqual({
      status: "Change",
      uuid: "uid1234",
      username: "Calman",
    });
  });
});

describe("Check word length is valid test", () => {
  test("should specify boolean to word length 1", () => {
    expect(CheckWordLength({ word: "Calmantarasp" })).toEqual(false);
  });
  test("should specify boolean to word length 2", () => {
    expect(CheckWordLength({ word: "Calman" })).toEqual(true);
  });
});

describe("Check word is valid test", () => {
  test("should specify boolean to word rules 1", () => {
    expect(CheckWordValid({ word: "Calman@#$" })).toEqual(false);
  });
  test("should specify boolean to word rules 2", () => {
    expect(CheckWordValid({ word: "Calman" })).toEqual(true);
  });
});

describe("Check Leave handler test", () => {
  test("should specify array to leave handler 1", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ];
    expect(
      LeaveHandler({
        username: "",
        uuid: "uid4567",
        status: "Leave",
        arr: records,
      })
    ).toEqual([
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ]);
  });
  test("should specify array to leave handler 2", () => {
    let records = [];
    expect(
      LeaveHandler({
        username: "",
        uuid: "uid4567",
        status: "Leave",
        arr: records,
      })
    ).toEqual([]);
  });
  test("should specify array to leave handler 1", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ];
    expect(
      LeaveHandler({
        username: "",
        uuid: "uid4567",
        status: "Leave",
        arr: records,
      })
    ).toEqual([
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ]);
  });
});

describe("Check Leave handler test", () => {
  test("should specify array to enter handler 1", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ];
    expect(
      EnterHandler({
        username: "Prodo",
        uuid: "uid4567",
        status: "Enter",
        arr: records,
      })
    ).toEqual([
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ]);
  });
  test("should specify array to enter handler 2", () => {
    let records = [];
    expect(
      EnterHandler({
        username: "Prodo",
        uuid: "uid4567",
        status: "Enter",
        arr: records,
      })
    ).toEqual([
      { username: "Prodo", uuid: "uid4567", msg: "came in.", status: "Enter" },
    ]);
  });
  test("should specify array to enter handler 3", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ];
    expect(
      EnterHandler({
        username: "Calman",
        uuid: "uid4567",
        status: "Enter",
        arr: records,
      })
    ).toEqual([
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ]);
  });
  test("should specify array to enter handler 4", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ];
    expect(
      EnterHandler({
        username: "Calman",
        uuid: "uid4567",
        status: "Enter",
        arr: records,
      })
    ).toEqual([
      {
        username: "Calman",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
      {
        username: "Calman",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
    ]);
  });
});

describe("Check Leave handler test", () => {
  test("should specify array to change handler 1", () => {
    let records = [
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
      {
        username: "Prodo",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ];
    expect(
      ChangeHandler({
        username: "Calman",
        uuid: "uid4567",
        status: "Change",
        arr: records,
      })
    ).toEqual([
      {
        username: "Calman",
        uuid: "uid4567",
        msg: "came in.",
        status: "Enter",
      },
      {
        username: "Calman",
        uuid: "uid4567",
        msg: "has left.",
        status: "Leave",
      },
    ]);
  });
  test("should specify array to change handler 2", () => {
    let records = [];
    expect(
      ChangeHandler({
        username: "",
        uuid: "uid4567",
        status: "Leave",
        arr: records,
      })
    ).toEqual([]);
  });
});
