const ValidateStage = ({ stageNum }) => {
  // validate whether stage in range
  return stageNum >= 1 && stageNum <= 500;
};

const ValidateUserAmount = ({ userArr }) => {
  // validate whether user amount in range
  return userArr.length >= 1 && userArr.length <= 200000;
};

const ValidateUserStage = ({ userArr, stageNum }) => {
  // validate whether user stage in range
  const outRange = userArr.find((el) => el > stageNum + 1);
  if (outRange) {
    console.warn("Users out of range");
    return false;
  }
  return true;
};

const ValidateUser = ({ userArr, stageNum }) => {
  // integrated validation for users
  return (
    ValidateUserStage({ userArr: userArr, stageNum: stageNum }) &&
    ValidateUserAmount({ userArr: userArr })
  );
};

module.exports = {
  ValidateStage: ValidateStage,
  ValidateUserStage: ValidateUserStage,
  ValidateUserAmount: ValidateUserAmount,
  ValidateUser: ValidateUser,
};
