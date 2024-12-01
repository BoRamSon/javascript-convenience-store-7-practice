const addItemPrice = (addInventoryPromotionQuantityResult, productsInventory) => {
  const findItemPrice = addInventoryPromotionQuantityResult.map((inputObj) => {
    const findedArr = productsInventory.find(
      (invenObj) => invenObj.name === inputObj.name
    );
    const price = findedArr.price;
    return { ...inputObj, price };
  });
  return findItemPrice;
};

const addTotalPrice = (addItemPriceResult) => {
  const findQuantityAndPrice = addItemPriceResult.map((inputObj) => {
    const totalPrice = inputObj.price * inputObj.quantity;
    return { ...inputObj, totalPrice };
  });
  return findQuantityAndPrice;
};

const addPrice = (addInventoryQuantity, productsInventory) => {
  const itemPrice = addItemPrice(addInventoryQuantity, productsInventory);
  return addTotalPrice(itemPrice);
};

export default addPrice;