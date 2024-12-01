const reduceQuantity = (products, quantityToBuy) => {
  products.forEach(product => {
    if (quantityToBuy > 0) {
      const quantityToReduce = Math.min(product.quantity, quantityToBuy);
      product.quantity -= quantityToReduce;
      quantityToBuy -= quantityToReduce;
    }
  });
  return quantityToBuy;
};

const isPromotionUpdateInventory = (boughtProducts, productsInventory) => {
  boughtProducts.forEach(boughtProduct => {
    let quantityToBuy = boughtProduct.quantity;
    const promoProducts = productsInventory.filter(product => product.name === boughtProduct.name && product.promotion !== null);
    quantityToBuy = reduceQuantity(promoProducts, quantityToBuy);
    const regularProducts = productsInventory.filter(product => product.name === boughtProduct.name && product.promotion === null);
    quantityToBuy = reduceQuantity(regularProducts, quantityToBuy);
  });
  return productsInventory;
};

const isNotPromotionUpdateInventory = (boughtProducts, productsInventory) => {
  boughtProducts.forEach(boughtProduct => {
    let quantityToBuy = boughtProduct.quantity;
    const regularProducts = productsInventory.filter(product => product.name === boughtProduct.name && product.promotion === null);
    quantityToBuy = reduceQuantity(regularProducts, quantityToBuy);
  });
  return productsInventory;
};

const updateInventory = (isPromotion, boughtProducts, productsInventory) => {
  if(isPromotion) return isPromotionUpdateInventory(boughtProducts, productsInventory)
    return isNotPromotionUpdateInventory(boughtProducts, productsInventory)
}

export default updateInventory;