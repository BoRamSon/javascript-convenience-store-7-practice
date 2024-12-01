const addPromotionDiscountPrice = (objectArray) => {
  const filteringPrice = objectArray.map((inputObj) => {
    if (inputObj.FreePromotionQuan > 0) {
      const discountPrice = inputObj.price * inputObj.FreePromotionQuan;
      return { ...inputObj, DiscountPrice: discountPrice };
    } else return { ...inputObj }
  });
  return filteringPrice;
};

export default addPromotionDiscountPrice;
