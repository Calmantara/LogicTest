function solution(relation) {
  //imported all moduled needed
  const { GetTransformedArray, Combination } = require("./modules/app3.module");
  const columnLength = relation.length;
  let transformedRelation = [];
  let possibility = 0;

  // transform array
  const transformedObject = GetTransformedArray({ arr: [...relation] });
  transformedRelation = [...transformedObject.arr];
  possibility = transformedObject.possibility;

  // make combination set
  let combinationSet = [];
  for (let i = 0; i < transformedRelation.length; ++i) {
    combinationSet.push(i);
  }

  // make combination possibility and join it
  let stringComb = Combination(combinationSet).map((el) => el.join(""));
  for (let i = 0; i < stringComb.length; ++i) {
    const combIndex = stringComb[i].split("");
    const combArr = new Array(columnLength).fill("");
    for (let j = 0; j < combIndex.length; ++j) {
      for (let k = 0; k < columnLength; ++k) {
        combArr[k] += transformedRelation[combIndex[j]][k];
      }
    }
    //check whether there is a duplicated value or not
    const tempSet = new Set(combArr).size;
    if (combArr.length === tempSet) {
      possibility++;
      console.log(combIndex);
      stringComb = stringComb.filter(
        (el) => el.indexOf(combIndex.join("")) === -1
      );
    }
  }

  return possibility;
}

console.log(
  solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"],
  ])
);

console.log(
  solution([
    ["100", "1", "ryan", "music", "2"],
    ["200", "2", "apeach", "math", "2"],
    ["300", "3", "tube", "computer", "3"],
    ["400", "4", "con", "computer", "4"],
    ["500", "5", "muzi", "music", "3"],
    ["600", "6", "apeach", "music", "2"],
  ])
);
console.log(
  solution([
    ["100", "1", "ryan", "music", "2", "a"],
    ["200", "2", "apeach", "math", "2", "a"],
    ["300", "3", "tube", "computer", "3", "b"],
    ["400", "4", "con", "computer", "4", "c"],
    ["500", "5", "muzi", "music", "3", "e"],
    ["600", "6", "apeach", "music", "2", "f"],
  ])
);
