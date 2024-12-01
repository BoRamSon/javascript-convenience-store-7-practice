
import { InputView } from "../views/InputView.js";
import { validInputAnswer } from "../validations/validInputAnswer.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { OutputView } from "../views/OutputView.js";

const validateRepurchaseWhether = async () => {
  try {
    const inputAnswer = await InputView.readRepurchaseWhether();
    validInputAnswer(inputAnswer);
    return inputAnswer;
  } catch (error) {
    MissionUtils.Console.print(error);
    return false;
  }
};

const repurchaseWhetherQustion = async () => {
  for (let i = 1; i < 10; i++) {
    const validatedAnswer = await validateRepurchaseWhether();
    if (validatedAnswer) return validatedAnswer;
    if (i === 5) {
      throw new Error(ERR_MESSAGE_STRING.INPUT_TRY_TO_FIVE);
    }
  }
  OutputView.printSpace();
};

export default repurchaseWhetherQustion;
