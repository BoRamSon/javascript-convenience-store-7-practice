import { OutputView } from "../views/OutputView.js";

const printProducts = (purchaseData) => {
  OutputView.printReceiptProducts();
  purchaseData.map((objectArray) =>
    OutputView.printReceiptProductsList(
      objectArray.name,
      objectArray.quantity,
      objectArray.price
    )
  );
};

const printGiveaway = (purchaseData) => {
  OutputView.printReceiptGiveaway();
  purchaseData.map((objectArray) => {
    if (objectArray.FreePromoQuan > 0)
      OutputView.printReceiptGiveawayList(
        objectArray.name,
        objectArray.FreePromoQuan
      );
  });
};

const addUtil = (array) => {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

const getTotalPriceArray = (purchaseData) => {
  return purchaseData.map((objectArray) => objectArray.totalPrice);
};

const getTotalQuantityArray = (purchaseData) => {
  return purchaseData.map((objectArray) => objectArray.quantity);
};

const printTotalPrice = (purchaseData) => {
  const totalPriceArray = getTotalPriceArray(purchaseData);
  const addTotalPrice = addUtil(totalPriceArray);
  const totalQuantityArray = getTotalQuantityArray(purchaseData);
  const addTotalQuantity = addUtil(totalQuantityArray);
  OutputView.printReceiptTotalPrice(addTotalQuantity, addTotalPrice);
  return addTotalPrice;
};

const printPromotionDiscount = (purchaseData) => {
  const promotionDiscountArray = purchaseData.map((objectArray) => {
    if (objectArray.FreePromoQuan > 0)
      return objectArray.price * objectArray.FreePromoQuan;
    return 0;
  });
  const addPromotionDiscount = addUtil(promotionDiscountArray);
  OutputView.printReceiptPromotionDiscount(addPromotionDiscount);
  return addPromotionDiscount;
};

const printMembership = (isMembership, totalPrice, discount) => {
  if (isMembership === "Y") {
    const membershipDiscount = (totalPrice - discount) * 0.3;
    OutputView.printReceiptMembership(membershipDiscount);
    return membershipDiscount;
  }
  OutputView.printReceiptMembership(0);
  return 0;
};

const payment = (totalPrice, discount, membershipPrice) => {
  const amount = totalPrice - (discount + membershipPrice);
  OutputView.printReceiptResult(amount);
  return amount;
};

const printReceipt = (purchaseData, isMembership) => {
  printProducts(purchaseData);
  printGiveaway(purchaseData);
  const totalPrice = printTotalPrice(purchaseData);
  const discount = printPromotionDiscount(purchaseData);
  const membershipPrice = printMembership(isMembership, totalPrice, discount);
  payment(totalPrice, discount, membershipPrice);
  OutputView.printSpace();  
  return;
};

export default printReceipt;
