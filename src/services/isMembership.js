import { InputView } from "../views/InputView.js";
import { validInputAnswer } from "../validations/validInputAnswer.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { OutputView } from "../views/OutputView.js";

const isMembershipQustion = async () => {
  try {
    const inputAnswer = await InputView.readMembershipDiscount();
    validInputAnswer(inputAnswer);
    return inputAnswer;
  } catch (error) {
    MissionUtils.Console.print(error);
    return false;
  }
};

const membershipAnswer = async () => {
  for (let i = 1; i < 10; i++) {
    const validatedAnswer = await isMembershipQustion();
    if (validatedAnswer) return validatedAnswer;
    if (i === 5) {
      throw new Error(ERR_MESSAGE_STRING.INPUT_TRY_TO_FIVE);
    }
  }
  OutputView.printSpace();
};

export default membershipAnswer;
