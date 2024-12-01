const buyGeneralQuantity = (objectArray) => {
  const filteringQuantity = objectArray.map((inputObj) => {
    if (inputObj.quantity >= inputObj.realPromotionQuan) {
      const buyGeneralQuan = inputObj.quantity - inputObj.realPromotionQuan;
      return { ...inputObj, BuyGeneralQuan: buyGeneralQuan };
    } else return { ...inputObj };
  });
  return filteringQuantity;
};

const buyOnlyGeneralQuantity = (buyGeneralQuantity) => {
  const filteringQuantity = buyGeneralQuantity.map((inputObj) => {
    if (inputObj.promotionQuan === 0) {
      return { ...inputObj, BuyGeneralQuan: inputObj.quantity };
    } else return { ...inputObj };
  });
  return filteringQuantity;
};

const getPromotionQuantityCalculOne = (buyOnlyGeneralQuantity) => {
  const filteringQuantity = buyOnlyGeneralQuantity.map((inputObj) => {
    if (inputObj.quantity >= inputObj.realPromotionQuan) {
      const freePromotionQuanCalculOne = Math.floor(inputObj.realPromotionQuan / 3);
      const buyPromotionQuanCalculOne = inputObj.realPromotionQuan - freePromotionQuanCalculOne;
      return { ...inputObj, BuyPromoQuan: buyPromotionQuanCalculOne, FreePromoQuan: freePromotionQuanCalculOne };
    } else return { ...inputObj };
  });
  return filteringQuantity;
};

const getPromotionQuantityCalculTwo = (getPromotionQuantity) => {
  const filteringQuantity = getPromotionQuantity.map((inputObj) => {
    if (inputObj.quantity < inputObj.realPromotionQuan) { 
      const freePromotionQuanCalculTwo = Math.floor(inputObj.quantity / 3);  
      const buyPromotionQuanCalculTwo = inputObj.quantity - freePromotionQuanCalculTwo; 
      return { ...inputObj, BuyPromoQuan: buyPromotionQuanCalculTwo, FreePromoQuan: freePromotionQuanCalculTwo };
    } else return { ...inputObj };
  });
  return filteringQuantity;
};

const addQuantityResult = (objectArray) => {
  const boughtGeneralQuantity = buyGeneralQuantity(objectArray);
  const boughtOnlyGeneralQuantity = buyOnlyGeneralQuantity(boughtGeneralQuantity);
  const boughtPromotionQuantityOne = getPromotionQuantityCalculOne(boughtOnlyGeneralQuantity);
  return getPromotionQuantityCalculTwo(boughtPromotionQuantityOne);
};

export default addQuantityResult;
