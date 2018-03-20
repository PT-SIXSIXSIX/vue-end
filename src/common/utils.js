let verifyPhone = phone => {
  return /^((13[0-9])|(15[^4,\D])|(17[0-9])|(18[0,5-9]))\d{8}$/.test(phone);
};

let verifyIdCard = idCard => {
  if (idCard.length == 15)
    return /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2\d)|(3[0-1]))\d{3}$/.test(idCard);
  else if (idCard.length == 18)
    return /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2\d)|(3[0-1]))\d{3}([0-9]|X)$/.test(idCard);
  return false;
};

let filterByKeys = (obj, keys, discard=true) => {
  let ikeys = Object.keys(obj);
  let matchingKeys = discard ? ikeys.filter(function(key){ return keys.indexOf(key) === -1 })
                             : ikeys.filter(function(key){ return keys.indexOf(key) > -1 });
  let newObj = {};
  for (let key in matchingKeys) {
    newObj[matchingKeys[key]] = obj[matchingKeys[key]];
  }
  return newObj;
};

let mapByKeys = (array, keys) => {
  let newArray = [];
  for (let index in array) {
    newArray.push(filterByKeys(array[index], keys, false))
  }
  return newArray;
};

let genSearchParams = obj => {
  let q = [];
  for (let key in obj) {
    q.push(key + ':' + obj[key].toString());
  }
  return q.join('+');
};

export default {
  verifyPhone,
  verifyIdCard,
  filterByKeys,
  mapByKeys,
  genSearchParams,
};
