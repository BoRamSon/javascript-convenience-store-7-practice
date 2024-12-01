import { productsInventory } from "../models/Inventory.js";
import InputProductsHandler from "../modules/InputProductsHandler.js";
import PrintGreetingAndInventory from "../modules/PrintGreatingAndInventory.js";
import PurchaseDataHandler from "../modules/PurchaseDataHandler.js";
import membershipDiscountPrice from "../services/isMembership.js";
import isPromotionDate from "../services/isPromotionDate.js";
import repurchaseWhetherQustion from "../services/isRepurchaseWhether.js";
import printReceipt from "../services/printReceipt.js";
import updateInventory from "../services/updateInventory.js";

class StoreController {
  updatedInvnetory;

  constructor() {
    this.printGreetingAndInventory = new PrintGreetingAndInventory();
    this.inputProductsHandler = new InputProductsHandler();
    this.PurchaseDataHandler = new PurchaseDataHandler();
    this.updatedInvnetory = productsInventory;
  }

  async openStore() {
    await this.purchaseLogic();
    const repurchaseWhetherAnswer = await repurchaseWhetherQustion();
    if (repurchaseWhetherAnswer === "Y") return this.openStore();
    return;
  }

  async purchaseLogic() {
    this.printGreetingAndInventory.run(this.updatedInvnetory);
    const validatedInput = await this.inputProductsHandler.purchaseQustion();
    const purchaseData = await this.PurchaseDataHandler.dataCollect(validatedInput, this.updatedInvnetory);
    this.updatedInvnetory = updateInventory(isPromotionDate, purchaseData, this.updatedInvnetory);
    const isMembership = await membershipDiscountPrice();
    printReceipt(purchaseData, isMembership);
    return;
  }
}

export default StoreController;
