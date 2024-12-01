import { DateTimes } from "@woowacourse/mission-utils";
import { Promotions } from "../models/Promotions.js";

const whatTodayDate = DateTimes.now();

const extractPromotionStartDate = () => {
  const promotionStartFilter = Promotions.filter(
    (array) => array.name === "탄산2+1"
  );
  return promotionStartFilter[0].start_date;
};

const extractPromotionEndDate = () => {
  const promotionEndFilter = Promotions.filter(
    (array) => array.name === "탄산2+1"
  );
  return promotionEndFilter[0].end_date;
};

const promotionStartDate = new Date(extractPromotionStartDate());
const promotionEndDate = new Date(extractPromotionEndDate());

const isPromotionDate = () => {
  if (
    whatTodayDate >= promotionStartDate &&
    whatTodayDate <= promotionEndDate
  ) {
    return true;
  }
  return false;
};

export default isPromotionDate;
