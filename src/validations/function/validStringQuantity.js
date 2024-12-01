import { ERR_MESSAGE_STRING } from "../../constants/errorMessages.js";
import isPromotionDate from "../../services/isPromotionDate.js";

const addExtractGeneralQuantity = (objectArray) => {
  const extractQuantity = objectArray.map((inputObj) => {
    return inputObj.quantity;
  });
  return extractQuantity.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

const extractedGeneralQuantity = (objectArray) => {
  if (objectArray) {
    return addExtractGeneralQuantity(objectArray);
  } else return 0;
};

const isPromition = (inputObjArr, inventory) => {
  const quantityAvailable = inputObjArr.every((inputArray) => {
    const findArray = inventory.filter((inventoryArray) => inventoryArray.name === inputArray.name);
    const inventoryQuantity = extractedGeneralQuantity(findArray);
    if (inputArray.quantity > inventoryQuantity) return false;
    return true;
  });
  if (!quantityAvailable) throw new Error(ERR_MESSAGE_STRING.OVER_PARCHASABLE_QUANTITY);
  return true;
};

const isNotPromotion = (inputObjArr, inventory) => {
  const quantityAvailable = inputObjArr.every((inputArray) => {
    return inventory.some((inventoryArray) => 
      inventoryArray.name === inputArray.name 
      && inventoryArray.promotion === null
      && inventoryArray.quantity >= inputArray.quantity
    );
  });
  if (!quantityAvailable) throw new Error(ERR_MESSAGE_STRING.OVER_PARCHASABLE_QUANTITY);
  return true;
};

const isPromoionNow = isPromotionDate();

export const validStringQuantity = (inputObjArr, inventory) => {
  if (isPromoionNow) return isPromition(inputObjArr, inventory);
  return isNotPromotion(inputObjArr, inventory);
};