import { OutputView } from "../views/OutputView.js";

class PrintGreetingAndInventory {
  run(productsInventory) {
    this.greetingString();
    this.inventoryAlertString();
    OutputView.printSpace();
    this.inventory(productsInventory);
    OutputView.printSpace();
  }

  greetingString() {
    OutputView.printGreeting();
  }

  inventoryAlertString() {
    OutputView.printProducts();
  }

  inventory(productsInventory) {
    productsInventory.forEach((product) => {
      const { name, price, quantity, promotion } = product;
      const quantityText = quantity > 0 ? `${quantity}개` : "재고 없음";
      const promotionText = promotion ? ` ${promotion}` : "";
      const productString = `- ${name} ${price.toLocaleString()}원 ${quantityText}${promotionText}`;
      OutputView.printProductString(productString);
    });
  }
}

export default PrintGreetingAndInventory;
