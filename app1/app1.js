// solution function
function solution(record) {
  // import all functions needed
  const {
    ChangeHandler,
    EnterHandler,
    LeaveHandler,
    CheckWordValid,
    ParseData,
  } = require("./modules/app1.module");

  let answer = [];
  let records = [];

  // Handlers function dictionary
  const Handlers = {
    Change: ChangeHandler,
    Leave: LeaveHandler,
    Enter: EnterHandler,
  };

  for (let i = 0; i < record.length; ++i) {
    //parse data
    const { status, uuid, username } = ParseData({ words: record[i] });

    // check whether uuid and username are not valid
    if (
      !CheckWordValid({ word: uuid, status: status }) ||
      !CheckWordValid({ word: username, status: status })
    ) {
      console.log(
        `The words is not valid for username:${username} and uuid:${uuid}`
      );
      return [];
    }

    records = Handlers[status]({
      username: username,
      uuid: uuid,
      arr: records,
      status: status,
    });
  }
  answer = records.map((el, idx) => `${el.username} ${el.msg}`);
  return answer;
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);

module.exports = {
  solution: solution,
};
