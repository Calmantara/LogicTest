function solution(N, users) {
  //import all functions needed
  const { ValidateStage, ValidateUser } = require("./modules/app2.module");

  const dict = { stage: 0, sum: 0, reachedSum: 0, failureRate: 0 };
  const result = [];

  // validate user inputs
  if (
    !ValidateUser({ userArr: users, stageNum: N }) ||
    !ValidateStage({ stageNum: N })
  ) {
    console.warn("Inputs are not valid");
    return result;
  }

  // proceed the logic
  for (let i = 1; i < N + 1; ++i) {
    let newEntries = new Object({ ...dict });
    const reachedArr = users.filter((el) => el >= i);
    const currArr = reachedArr.filter((el) => el === i);

    newEntries.stage = i;
    newEntries.reachedSum = reachedArr.length;
    newEntries.sum = currArr.length;
    newEntries.failureRate = currArr.length / reachedArr.length;
    result.push(newEntries);
  }

  // sort the result array
  result.sort((left, right) => right.failureRate - left.failureRate);

  //return only stages
  return result.map((el) => el.stage);
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
console.log(solution(4, [4, 4, 4, 4, 4]));

module.exports = {
  solution: solution,
};
