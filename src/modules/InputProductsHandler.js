import { InputView } from "../views/InputView.js";
import { convertObjArr } from "../utils/convertObjArr.js";
import { productsInventory } from "../models/Inventory.js";
import { validInputProducts } from "../validations/validInputProducts.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERR_MESSAGE_STRING } from "../constants/errorMessages.js";
import { OutputView } from "../views/OutputView.js";

class InputProductsHandler {
  constructor() {
    this.products = productsInventory;
  }

  async inputProducts() {
    const inputValue = await InputView.readProductsAndQuantity();
    const inputString = inputValue.replace(/ /g, "");
    const inputObjArr = convertObjArr(inputString);
    return { inputString, inputObjArr };
  }

  async validateLogic() {
    const { inputString, inputObjArr } = await this.inputProducts();
    validInputProducts(inputString, inputObjArr, this.products);
    return inputObjArr;
  }

  async validatingInput() {
    try {
      const validatedInput = await this.validateLogic();
      return validatedInput;
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return false;
    }
  }

  async purchaseQustion() {
    for (let i = 1; i < 10; i++) {
      const validatedInput = await this.validatingInput();
      if (validatedInput) return validatedInput;
      if (i === 5) {
        throw new Error(ERR_MESSAGE_STRING.INPUT_TRY_TO_FIVE);
      }
    }
    OutputView.printSpace();
  }
}

export default InputProductsHandler;