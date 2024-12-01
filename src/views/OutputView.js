import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "../constants/outputMessages.js";

const spaceWithProduct = (name) => {
  if (name.length === 2) return "             ";
  if (name.length === 3) return "           ";
  if (name.length === 4) return "         ";
};

const spaceWithQuantity = "         ";

export const OutputView = {
  printGreeting() {
    MissionUtils.Console.print(OUTPUT_MESSAGES.GREETING);
  },

  printProducts() {
    MissionUtils.Console.print(OUTPUT_MESSAGES.INVENTORY_ALERT);
  },

  printProductString(productString) {
    MissionUtils.Console.print(productString);
  },

  printSpace() {
    MissionUtils.Console.print("");
  },

  printReceiptProducts() {
    MissionUtils.Console.print(OUTPUT_MESSAGES.RECEIPT_STORE_NAME);
    MissionUtils.Console.print(OUTPUT_MESSAGES.RECEIPT_ITEM_NAME);
  },

  printReceiptProductsList(name, quantity, price) {
    MissionUtils.Console.print(
      `${name}${spaceWithProduct(
        name
      )}${quantity}${spaceWithQuantity}${price.toLocaleString()}`
    );
  },

  printReceiptGiveaway() {
    MissionUtils.Console.print(OUTPUT_MESSAGES.RECEIPT_GIVEAWAY_LINE);
  },

  printReceiptGiveawayList(giveawayItemName, giveawayItemQuantity) {
    MissionUtils.Console.print(
      `${giveawayItemName}${spaceWithProduct(giveawayItemName)}${giveawayItemQuantity}`
    );
  },

  printReceiptTotalPrice(totalQuantity, totalPrice) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.RECEIPT_THIRD_LINE);
    MissionUtils.Console.print(
      `총구매액         ${totalQuantity}        ${totalPrice.toLocaleString()}`
    );
  },

  printReceiptPromotionDiscount(addPromotionDiscount) {
    MissionUtils.Console.print(
      `행사할인                  -${addPromotionDiscount.toLocaleString()}`
    );
  },

  printReceiptMembership(membershipDiscount) {
    MissionUtils.Console.print(
      `멤버십할인                -${membershipDiscount.toLocaleString()}`
    );
  },

  printReceiptResult(price) {
    MissionUtils.Console.print(
      `내실돈                    ${price.toLocaleString()}`
    );
  },
};
