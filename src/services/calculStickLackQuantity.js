import { InputView } from "../views/InputView.js";
import { validInputAnswer } from "../validations/validInputAnswer.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERR_MESSAGE_STRING } from "../constants/errorMessages.js";

const addFixedPrice = (addYouCanAddPromotionQuantity) => {
  const findQuantityAndPromotionQuan = addYouCanAddPromotionQuantity.map(
    (inputObj) => {
      if (inputObj.realPromotionQuan > 0 && 0 < inputObj.quantity && inputObj.quantity > inputObj.realPromotionQuan) {
        const noPromotionQuantity = inputObj.quantity - inputObj.realPromotionQuan;
        return { ...inputObj, IsLackPromQuan: true, LackPromoQuan: noPromotionQuantity };
      } else return { ...inputObj };
    });
  return findQuantityAndPromotionQuan;
};

const someObjectArray = (validatedInput) => { 
  let filteredItems = validatedInput.filter(objArr => objArr.IsLackPromQuan === true); 
  let remainingItems = validatedInput.filter(objArr => objArr.IsLackPromQuan !== true); 
  let reorderedItems = filteredItems.concat(remainingItems);
  return reorderedItems;
};

const lackQuantityObjectArray = (someObjectArray) => { 
  const whatLength = someObjectArray.filter((inputObj) => {
    return inputObj.IsLackPromQuan == true;
  });
  return whatLength;
};

const inputAndValidation = async (targetName, lackQuantity) => {
  try {
    const inputAnswer = await InputView.readPromotionNoDiscount(targetName, lackQuantity);
    validInputAnswer(inputAnswer);
    return inputAnswer;
  } catch (error) {
    MissionUtils.Console.print(error.message);
    return false;
  }
};

const receiveInputDuringError = async (targetName, lackQuantity) => {
  for (let i = 1; i < 10; i++) {
    const validatedAnswer = await inputAndValidation(targetName, lackQuantity);
    if (validatedAnswer) return validatedAnswer;
    if (i === 5) {
      throw new Error(ERR_MESSAGE_STRING.INPUT_TRY_TO_FIVE);
    }
  }
};

const inputAnswerLackQuantity = async (someObjectArray, objectArray) => { 
  for (let i = 0; i < objectArray.length; i++) {
    const target = someObjectArray[i]
    const targetName = someObjectArray[i].name;
    const lackQuantity = someObjectArray[i].LackPromoQuan;
    const validatedInputAnswer = await receiveInputDuringError(targetName, lackQuantity);
    if (validatedInputAnswer === "N") { target.quantity -= target.LackPromoQuan; target.LackPromoQuan = 0;}
  }
  return someObjectArray;
};

const qustionAddLackQuantity = async (addFreeOneProduct) => {
  const fixedPrice = addFixedPrice(addFreeOneProduct);
  const sort = someObjectArray(fixedPrice);
  const length = lackQuantityObjectArray(sort);
  return await inputAnswerLackQuantity(sort, length);
};

export default qustionAddLackQuantity;