const ChangeHandler = ({ username, uuid, status, arr }) => {
  // change status handler
  arr = arr.map((el) => {
    return el.uuid === uuid ? { ...el, username: username } : el;
  });
  return arr;
};

const EnterHandler = ({ username, uuid, status, arr }) => {
  // enter status handler
  const duplicateArr = [...arr];
  const existArr = duplicateArr.reverse().find((el) => el.uuid === uuid);

  /**
   * 1. if there is no exist element
   * 2. if there is exist element and already left
   * 3. if there is exist element and already joined
   */
  //   console.log(existArr);
  if (!existArr) {
    // push to new array
    arr.push({
      username: username,
      uuid: uuid,
      msg: "came in.",
      status: status,
    });
  } else if (existArr.status !== "Enter") {
    arr = arr.map((el) =>
      el.uuid === uuid ? { ...el, username: username, uuid: uuid } : el
    );
    // push to new array
    arr.push({
      username: username,
      uuid: uuid,
      msg: "came in.",
      status: status,
    });
  } else {
    console.warn(`Users ${username} has already joined`);
  }

  return arr;
};

const LeaveHandler = ({ username, uuid, status, arr }) => {
  // exit status handler
  const duplicateArr = [...arr];
  const existArr = duplicateArr.reverse().find((el) => el.uuid === uuid);

  /**
   * 1. if there is exist element and status is enter
   * 2. else it will not push to new element
   */
  if (existArr && existArr.status !== "Leave") {
    arr.push({
      username: existArr.username,
      uuid: existArr.uuid,
      msg: "has left.",
      status: status,
    });
  } else {
    console.warn(`Users ${uuid} has already left`);
  }
  return arr;
};

const CheckWordLength = ({ word }) => {
  // check whether word length is valid
  const length = word.length;
  return length >= 1 && length <= 10;
};

const CheckWordValid = ({ status, word }) => {
  // check whether word is valid
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return status === "Leave"
    ? (() => {
        const isMatched = !format.test(word);
        return isMatched;
      })()
    : (() => {
        const length = CheckWordLength({ word: word });
        const isMatched = !format.test(word);
        return length && isMatched;
      })();
};

const ParseData = ({ words }) => {
  // parse the words to data
  const wordArr = words.split(" ");
  const status = wordArr[0];
  const uuid = wordArr[1];
  const username = wordArr[2] ? wordArr[2] : "";

  return {
    status: status,
    uuid: uuid,
    username: username,
  };
};

module.exports = {
  ChangeHandler: ChangeHandler,
  EnterHandler: EnterHandler,
  LeaveHandler: LeaveHandler,
  CheckWordLength: CheckWordLength,
  CheckWordValid: CheckWordValid,
  ParseData: ParseData,
};
