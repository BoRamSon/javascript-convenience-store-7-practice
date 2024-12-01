const addExtractGeneralQuantity = (objectArray) => {
  const extractQuantity = objectArray.map((inputObj) => {
    return inputObj.quantity;
  })
  return extractQuantity.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const extractedGeneralQuantity = (objectArray) => {
  if (objectArray) {
    return addExtractGeneralQuantity(objectArray);
  } else return 0;
};

const addInventoryGeneralQuantity = (validatedInput, productsInventory) => {
  const findAddGeneralQuantity = validatedInput.map((inputObj) => {
    const findArray = productsInventory.filter(
      (invenObj) =>
        invenObj.name === inputObj.name && invenObj.promotion !== "탄산2+1"
    );
    const generalQuan = extractedGeneralQuantity(findArray);
    return { ...inputObj, generalQuan };
  });
  return findAddGeneralQuantity;
};

const extractPromotionQuantity = (findedArr) => {
  if (findedArr) {
    return findedArr.quantity;
  } else return 0;
};

const addInventoryPromotionQuantity = (objectArray, productsInventory) => {
  const findPromotionQuantity = objectArray.map((inputObj) => {
    const findedArr = productsInventory.find(
      (invenObj) => invenObj.name === inputObj.name && invenObj.promotion == "탄산2+1"
    );
    const promotionQuan = extractPromotionQuantity(findedArr);
    return { ...inputObj, promotionQuan };
  });
  return findPromotionQuantity;
};

const addPromotionQuanDivisionThree = (addWantServiceQuantity) => {
  const findQuantityAndPromotionQuan = addWantServiceQuantity.map((inputObj) => {
      if (inputObj.promotionQuan > 0) {
        const Quantity = Math.floor(inputObj.promotionQuan / 3);
        const realPromotionQuan = Quantity * 3;
        return { ...inputObj, realPromotionQuan };
      } else return { ...inputObj };
    });
  return findQuantityAndPromotionQuan;
};

const addInventoryQuantity = (validatedInput, productsInventory) => {
  const addGeneralQuantity = addInventoryGeneralQuantity(validatedInput, productsInventory);
  const promotionQuantity = addInventoryPromotionQuantity(addGeneralQuantity, productsInventory);
  return addPromotionQuanDivisionThree(promotionQuantity);
}

export default addInventoryQuantity;