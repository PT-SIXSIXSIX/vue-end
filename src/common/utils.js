let verifyPhone = phone => {
  return /^[1][34578][0-9]{9}$/.test(phone);
};

let verifyIdCard = idCard => {
  return /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
};

let filterByKeys = (obj, discardKeys) => {
  let keys = Object.keys(obj);
  let matchingKeys = keys.filter(function(key){ return discardKeys.indexOf(key) === -1 });
  let newObj = {};
  for (let key in matchingKeys) {
    newObj[matchingKeys[key]] = obj[matchingKeys[key]];
  }
  return newObj;
};

export default {
  verifyPhone,
  verifyIdCard,
  filterByKeys,
};
