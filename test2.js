function transformPriceData(data) {
  console.warn("数据格式转换中");
  let typeMap = {
    // 类型与字段的映射
    1: "continueMonth",
    2: "month",
    3: "continueQuarter",
    4: "quarter",
    5: "continueYear",
    6: "year"
  };

  let anchorPriceMap = {
    // 一个月，一个季，一年的真实价格
    month: 0,
    quarter: 0,
    year: 0
  };

  let continueAnchorPricemap = {
    // 包月、包季、包年，映射的真实价格字段
    1: "month",
    3: "quarter",
    5: "year"
  };

  data.forEach(item => {
    if (typeMap[item.type] in anchorPriceMap) {
      anchorPriceMap[typeMap[item.type]] = item.price;
    }
  });
  const data1 = data.map(item => {
    return {
      currency: "cny",
      planType: typeMap[item.type],
      anchorPrice:
        item.type in continueAnchorPricemap
          ? anchorPriceMap[continueAnchorPricemap[item.type]]
          : item.price,
      realPrice: item.price
    };
  });
  console.warn("数据格式转换成功", data1);

  return data.map(item => {
    return {
      currency: "cny",
      planType: typeMap[item.type],
      anchorPrice:
        item.type in continueAnchorPricemap
          ? anchorPriceMap[continueAnchorPricemap[item.type]]
          : item.price,
      realPrice: item.price
    };
  });
}

transformPriceData([
  { type: 1, price: 90 },
  { type: 2, price: 901 },
  { type: 3, price: 90 },
  { type: 4, price: 903 },
  { type: 5, price: 90 },
  { type: 6, price: 950 }
]);
