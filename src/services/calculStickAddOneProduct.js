import { InputView } from "../views/InputView.js";
import { validInputAnswer } from "../validations/validInputAnswer.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERR_MESSAGE_STRING } from "../constants/errorMessages.js";

const youCanAddPromotionQuantity = (addTotalPriceResult) => {
  const findQuantityAndPromotionQuan = addTotalPriceResult.map((inputObj) => {
    if (
      inputObj.realPromotionQuan > 0 && inputObj.quantity < inputObj.realPromotionQuan && inputObj.quantity % 3 === 2
    ) {
      return { ...inputObj, AddOneProduct: true };
    } else return { ...inputObj };
  });
  return findQuantityAndPromotionQuan;
};

const sortForward = (validatedInput) => {
  let filteredItems = validatedInput.filter(
    (objArr) => objArr.AddOneProduct === true
  );
  let remainingItems = validatedInput.filter(
    (objArr) => objArr.AddOneProduct !== true
  );
  let reorderedItems = filteredItems.concat(remainingItems);
  return reorderedItems;
};

const someObjectArray = (objectArray) => {
  const whatLength = objectArray.filter((inputObj) => {
    return inputObj.AddOneProduct == true;
  });
  return whatLength;
};

const inputAndValidation = async (targetName) => {
  try {
    const inputAnswer = await InputView.readPromotionAddItem(targetName); 
    validInputAnswer(inputAnswer);   
    return inputAnswer;
  } catch (error) {
    MissionUtils.Console.print(error.message);
    return false;
  }
}

const receiveInputDuringError = async (targetName) => {
  for (let i = 1; i < 10; i++) {
    const validatedAnswer = await inputAndValidation(targetName);
    if (validatedAnswer) return validatedAnswer;
    if (i === 5) {
      throw new Error(ERR_MESSAGE_STRING.INPUT_TRY_TO_FIVE);
    }
  }
}

const inputAnswerAddOne = async (sortForward, objArrLength) => {
  for (let i = 0; i < objArrLength.length; i++) {
    const target = sortForward[i];
    const targetName = sortForward[i].name;
    const validatedInputAnswer = await receiveInputDuringError(targetName);
    if (validatedInputAnswer === "Y") target.quantity += 1;
  }
  return sortForward;
};

const qustionFreeOneProduct = async (objectArray) => {
  const isFree = youCanAddPromotionQuantity(objectArray);
  const sortFoward = sortForward(isFree);
  const length = someObjectArray(sortFoward);
  const answerArray = await inputAnswerAddOne(sortFoward, length);
  return answerArray;
};

export default qustionFreeOneProduct;

