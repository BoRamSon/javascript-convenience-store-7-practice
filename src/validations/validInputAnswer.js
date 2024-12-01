import { validStringEmpty } from "./function/validStringEmpty.js";
import { validLimitLength } from "./function/validLimitLength.js";
import { validStringRegEx } from "./function/validStringRegEx.js";

export const validInputAnswer = (inputString) => {
  validStringEmpty(inputString);
  validLimitLength(inputString, 1);
  const regExPattern = /^[YN]$/;
  validStringRegEx(inputString, regExPattern);
  return true;
};