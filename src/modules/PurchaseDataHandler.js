import { OutputView } from "../views/OutputView.js";
import addInventoryQuantity from "../services/calculStickInvenQuantity.js";
import addPrice from "../services/calculStickPrice.js";
import qustionFreeOneProduct from "../services/calculStickAddOneProduct.js";
import qustionAddLackQuantity from "../services/calculStickLackQuantity.js";
import addQuantityResult from "../services/calculStickPurchaseQuantity.js";
import addPromotionDiscountPrice from "../services/calculStickDiscountPrice.js";

class PurchaseDataHandler {
  async dataCollect(validatedInput, productsInventory) {
    const inventoryQuantity = addInventoryQuantity(validatedInput, productsInventory);
    const qustionFreeProduct = await qustionFreeOneProduct(inventoryQuantity);
    const qustionLackQuantity = await qustionAddLackQuantity(qustionFreeProduct);
    const totalPrice = addPrice(qustionLackQuantity, productsInventory);
    const quantityResult = addQuantityResult(totalPrice);
    const promotionDiscountPrice = addPromotionDiscountPrice(quantityResult);
    OutputView.printSpace();
    return promotionDiscountPrice;
  }
}

export default PurchaseDataHandler;